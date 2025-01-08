
const ContactModel = require("../../models/ContactModel");

module.exports = (req, res) => {
    const contact = ContactModel.create({
        "Name": req.body.Name,
        "Email": req.body.Email,
        "Subject": req.body.Subject,
        "Comment": req.body.Comment,

    }).then((result) => {
        res.json({ "msg": `Successfully Inserted ${result}` }).status(200)
    }).catch((err) => res.json({ "Error": err }).status(401));
}