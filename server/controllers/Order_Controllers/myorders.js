
const { OrderModel } = require('../../models/OrderModel');

module.exports = async (req, res) => {
    try {
        let UserId = req.session.user[0]._id;;
        const orders = await OrderModel.find({ "UserId": UserId }).populate("Products.ProductDet");
        res.json(orders).status(200);
    }
    catch (err) {
        res.json({ "Err": err.message }).status(400)
    }
}