

const { ProductModel } = require('../../models/ProductModel')

module.exports = (req, res) => {
    ProductModel.find({ _id: { $ne: req.params.ProductId } }).then((result) => {
        res.json(result).status(200);
    }).catch((err) => res.status(401).json({ "Error": err }))
}