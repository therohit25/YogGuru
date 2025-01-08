
const { ProductModel } = require('../../models/ProductModel')

module.exports = (req, res) => {

    ProductModel.find({ "_id": req.params.ProductId }).then((result) => {
        res.json(result).status(200)
    }).catch(err => res.json({ "err": err }).status(400))
}