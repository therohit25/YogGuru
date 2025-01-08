const UserModel = require("../../models/UserModel");

module.exports = async (req, res) => {
  try {
    const result = await UserModel.find({ Role: "Trainer" });

    res.json(result);
  } catch (error) {
    console.error("Error :", error?.message);
    res.json({ error: error.message });
  }
};
