const OpenAI = require("openai");
require("dotenv").config({
  path: "./data/config.env",
});
const Bottleneck = require("bottleneck");

const openai = new OpenAI({
  apiKey: process.env.API_KEY,
});

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 20000,
});

async function callOpenAI(payload) {
  const instruction = `
    If the question is related to fitness, healthy meals, diet, exercise, yoga, or health, start the response with "Sure," and provide a concise answer in 50-60 words.
    For any other questions, reply with "Sorry, I can't answer this question.".
  `;

  return limiter.schedule(async () => {
    return await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: instruction },
        { role: "user", content: payload },
      ],
      max_tokens: 50,
      temperature: 0.2,
      top_p: 0.6,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    });
  });
}

module.exports = async (req, res) => {
  let payload = req.body.currentPayload;

  try {
    const response = await callOpenAI(payload);
    res.json(response);
  } catch (error) {
    console.error("Error with OpenAI API:", error.message);
    res.status(500).send({ error: error.message });
  }
};
