const AdminModel = require("../../models/AdminModel");

module.exports = (req, res) => {
  AdminModel.find({ Username: req.body.admin, Password: req.body.password })
    .then((result) => {
      let msg = "";
      if (result.length === 1) {
        req.session.admin = result;
        msg = "Login Successfull!...";
      } else {
        msg = "Invalid Credentials!..";
      }

      res.json({ msg: msg, result: result }).status(200);
    })
    .catch((err) =>
      res
        .json({ Error: `Error while Admin Logining In : {err.message}` })
        .status(401)
    );
};
