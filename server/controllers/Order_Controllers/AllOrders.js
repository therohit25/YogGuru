const { OrderModel } = require("../../models/OrderModel");
module.exports = async (req, res) => {
    try {

        const result = await OrderModel.find({}).populate("UserId")
        res.json(result).status(200);
    }
    catch (err) {

        res.json({ "Error": err.message }).status(400)
    }
}