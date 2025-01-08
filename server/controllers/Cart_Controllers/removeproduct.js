
const { CartModel } = require("../../models/CartModel")

module.exports = (req, res) => {
    let UserId = req.session.user[0]._id;
    CartModel.updateOne({ "UserId": UserId }, { $pull: { "Products": { "ProductDet": req.body.ProductId } } }).then((result) => {

        res.json(result).status(200)

    }).catch((err) => res.json(err).status(401))
}