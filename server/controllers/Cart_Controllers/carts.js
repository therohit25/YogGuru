

const { CartModel } = require('../../models/CartModel')

module.exports = (req, res) => {

    let UserId = req.session.user[0]._id;

    CartModel.find({ "UserId": UserId }).populate('Products.ProductDet').then((result) => {

        res.json({ "Productdata": result }).status(200)

    }).catch((err) => res.json({ "Error": `Error while fetching cart : ${err.message}` }).status(401))
}