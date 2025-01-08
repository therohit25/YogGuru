const { ProductModel } = require("../../models/ProductModel");
module.exports = (req, res) => {
  ProductModel.findOneAndUpdate(
    { _id: req.body.ProductId },
    { $set: { Quantity: req.body.Quantity } },
    { new: true }
  )
    .then((result) => {
      res.json(result).status(200);
    })
    .catch((err) => res.json(err).status(401));
};
