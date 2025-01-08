const { mongoose } = require("../data/dbconfig");
const { ObjectId } = mongoose.Schema.Types

const CartSchema = mongoose.Schema({

    "UserId": {
        type: ObjectId,
        ref: "users",
        required: true
    },

    Products: [
        {
            "ProductDet": {
                type: ObjectId,
                ref: "products",
                required: true
            },
            "Quantity": {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]

})

const CartModel = mongoose.model('carts', CartSchema)

module.exports = { CartModel };