const { OrderModel } = require("../../models/OrderModel");
module.exports = async (req, res) => {
    try {
        let OrderId = req.body.OrderId;
        let Status = req.body.Status;

        const result = await OrderModel.updateOne({ _id: OrderId }, { $set: { "Status": Status } })


        res.json(result).status(200);
    }
    catch (err) {

        res.json({ "Error": err.message }).status(400)
    }
}