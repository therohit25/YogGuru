const { ProductModel } = require("../../models/ProductModel");

module.exports = (req, res) => {
  ProductModel.find({})
    .then((result) => {
      res.json(result).status(200);
    })
    .catch((err) => res.json({ Error: err }).status(401));
};
