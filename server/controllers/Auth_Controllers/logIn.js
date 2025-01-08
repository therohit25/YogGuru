
const UserModel = require("../../models/UserModel");


module.exports = (req, res) => {
    UserModel.find({ "Email": req.body.email, Password: req.body.password }).then((result) => {
        let msg = "";
        if (result.length === 1) {

            req.session.user = result;
            msg = "Login Successfull!..."
        }
        else {
            msg = "Invalid Credentials!.."
        }

        res.json({ "msg": msg, "result": result }).status(200)
    }
    ).catch((err) => res.json({ "Error": `Error while loging In : ${err.message} ` }).status(401))
}
