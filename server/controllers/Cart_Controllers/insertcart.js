

const { CartModel } = require("../../models/CartModel");
module.exports = (req, res) => {

    let UserId = req.session.user[0]._id;

    if (!req.body._id) {

        return res.status(400).json({ "error": "ProductId and Quantity are required fields." });
    }

    CartModel.find({ "UserId": UserId }).then((result) => {
        if (result.length === 0) {
            CartModel.create({
                "UserId": UserId,
                "Products": [{
                    "ProductDet": req.body._id,
                    "Quantity": 1
                }]
            }
            ).then((result2) => {

                res.json({ "msg": "Item Added into Cart Successfully!.." + result2 }).status(200)
            }).catch((err) => {

                res.json({ "error": err.message }).status(401)
            }
            )
        }
        else {


            if (result[0].Products.some(item => item.ProductDet.toString() === req.body._id)) {

                res.json({ "msg": "Product Already Added!.." }).status(200);

            }

            else {

                result[0].Products.push({ "ProductDet": req.body._id, "Quantity": 1 })

                result[0].save()
                    .then(
                        res.json(
                            result
                        ).status(200)
                    ).catch((err) => res.json({ "Error inserting Cart": err }).status(401))

            }

        }
    }).catch((err) => res.json({ "error": err }).status(401))
}