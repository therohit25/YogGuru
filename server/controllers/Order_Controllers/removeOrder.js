const { OrderModel } = require("../../models/OrderModel");
module.exports = async (req, res) => {
  try {
    let OrderId = req.body.OrderId;
    const result = await OrderModel.deleteOne({ _id: OrderId });
    res.json(result).status(200);
  } catch (err) {
    console.error(err?.message);
    res.json({ Error: err?.message }).status(400);
  }
};
