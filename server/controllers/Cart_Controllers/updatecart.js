
const { CartModel } = require('../../models/CartModel')
module.exports = (req, res) => {
    let UserId = req.session.user[0]._id;
    CartModel.updateOne({ "Products.ProductDet": req.body.ProductId, "UserId": UserId }, { $set: { "Products.$.Quantity": req.body.Quantity } }).then(result => res.json(result).status(200)).catch(err => res.json(err).status(401))
}