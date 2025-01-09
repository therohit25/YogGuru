import { useState } from "react";
import axios from "axios";
import retry from "async-retry";
import { SyncLoader } from "react-spinners";

// Create a queue to hold the pending requests
const requestQueue = [];

const OpenAIChat = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [responses, setResponses] = useState(null);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = message;

    requestQueue.push(payload);

    while (requestQueue.length > 0) {
      const currentPayload = requestQueue.shift();

      try {
        setLoading(true);
        const response = await retry(
          async () => {
            const res = await axios.post(
              "https://yogguru-backend.onrender.com/yoga/yogaassistant",
              { currentPayload: currentPayload }
            );

            if (res.status === 429) {
              throw new Error("Rate limit exceeded");
            }

            return res;
          },
          {
            retries: 5,
            minTimeout: 1000,
            factor: 2,
          }
        );

        setResponses(response?.data?.choices[0]?.message?.content);
        setLoading(false);
        const msg = new SpeechSynthesisUtterance();
        msg.text = response?.data?.choices[0]?.message?.content;
        window.speechSynthesis.speak(msg);

        setMessage("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div
      className="d-flex align-items-center  flex-column"
      style={{ backgroundColor: "#faeeea", height: "60dvh" }}
    >
      <p className="my-5 heading">
        <span
          className="text-uppercase"
          style={{
            paddingBottom: "1%",
            borderBottom: "2px solid rgb(157, 154, 154)",
          }}
        >
          Yoga Assistant <i className="fa-solid fa-handshake-angle px-1"></i>
        </span>
      </p>
      <form
        onSubmit={handleSubmit}
        className="  d-flex justify-content-center gap-2"
      >
        <div className="d-flex flex-column gap-5">
          <input
            type="text"
            value={message}
            onChange={handleChange}
            className="form-control"
            placeholder="Ask me anything about Yoga"
            id="assistantip"
          />

          <label htmlFor="assistantip" className=" display-6 ">
            How can I help you with you
          </label>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Send
          </button>
        </div>
      </form>
      <hr />
      {loading ? (
        <SyncLoader color="#36d7b7" />
      ) : (
        <>
          {responses && (
            <div
              name="response"
              id="response"
              className="form-control my-3"
              style={{ overflow: "scroll", width: "50vw", height: "30vh" }}
            >
              {responses}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OpenAIChat;
