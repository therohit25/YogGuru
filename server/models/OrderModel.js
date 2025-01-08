
const { mongoose } = require("../data/dbconfig");
const { ObjectId } = mongoose.Schema.Types;


const OrderSchema = mongoose.Schema({
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
                required: true
            }
        }
    ]
    ,
    TotalPrice: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        enum: ["Pending", "Dispatched", "Delivered"],
        default: "Pending",
        required: true

    }
    ,
    OrderAt: {
        type: Date,
        default: Date.now()
    }
})


const OrderModel = mongoose.model('orders', OrderSchema);

module.exports = { OrderModel }