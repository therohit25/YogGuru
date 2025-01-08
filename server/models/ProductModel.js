const { mongoose } = require("../data/dbconfig");

const ProductSchema = mongoose.Schema({
    "ProductName": {
        type: String,
        required: true,
    },
    "ProductDes": {
        type: String,
        required: true,
    },
    "ProductImg": {
        type: String,
        required: true,
    },
    "ProductPrice": {
        type: Number,
        required: true,
    },
    "Quantity": {
        type: Number,
        required: true,
        default: 1
    }
})

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = { ProductModel };