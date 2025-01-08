const UserModel = require("../../models/UserModel");

module.exports = (req, res) => {
  UserModel.create({
    Name: req.body.name,
    Email: req.body.email,
    Password: req.body.password,
    ContactNo: req.body.contactno,
    Address: req.body.address,
    Role: req.body.role,
    Mode: req.body.mode,
    Certificate: req.body.certificate,
  })
    .then((result) => {
      res.json({ msg: "Successfully Inserted", uid: result._id }).status(200);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(401)
        .json({ Error: `Error while Registering : ${err.message}` });
    });
};
