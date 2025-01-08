
const { OrderModel } = require("../../models/OrderModel");
const { CartModel } = require("../../models/CartModel")

module.exports = async (req, res) => {
    try {
        let UserId = req.session.user[0]._id;
        let OrderData = await CartModel.find({ "UserId": UserId })
        const TotalPrice = { TotalPrice: req.body.TotalPrice }
        OrderData =
        {
            ...OrderData[0]._doc,
            ...TotalPrice
        }

        await OrderModel.create(OrderData)
        res.json({ "msg": "Order Added Successfully" }).status(200);
    }
    catch (err) {

        res.json({ "Error": err.message }).status(400)
    }
}
