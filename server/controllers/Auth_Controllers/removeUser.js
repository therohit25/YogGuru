const UserModel = require("../../models/UserModel");
module.exports = async (req, res) => {
  try {
    let UserId = req.body.UserId;

    const result = await UserModel.deleteOne({ _id: UserId });

    res.json(result).status(200);
  } catch (err) {
    console.error(`Error while rempving user : ${err?.message}`);
    res
      .json({ Error: `Error while removing user : ${err?.message}` })
      .status(400);
  }
};
