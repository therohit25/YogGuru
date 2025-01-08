const { ProductModel } = require("../../models/ProductModel");
module.exports = async (req, res) => {
  try {
    let ProductId = req.body.ProductId;
    const result = await ProductModel.deleteOne({ _id: ProductId });
    res.json(result).status(200);
  } catch (err) {
    console.error(err?.message);
    res.json({ Error: err?.message }).status(400);
  }
};
