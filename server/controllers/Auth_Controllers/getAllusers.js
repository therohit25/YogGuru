const UserModel = require("../../models/UserModel")

module.exports = async (req, res) => {
    try {

        const result = await UserModel.find({});
        res.json(result);
    } catch (error) {

        res.json({ Error: `Error while fetching All Users :  ${error.message}` });
    }
}