const UserModel = require("../../models/UserModel")

module.exports = async (req, res) => {
    const user = await UserModel.findOne({ _id: req.body._id });
    user.Name = req.body.Name;
    user.Email = req.body.Email;
    user.Role = req.body.Role;
    user.Address = req.body.Address;
    user.ContactNo = req.body.ContactNo;
    await user.save();
}