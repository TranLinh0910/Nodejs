import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;
const products = mongoose.Schema({
    name: {
        type: String,
    },
    // description: {
    //     type: String,
    //     maxLength: 2000
    // },
    price: {
        type: Number,
    },
    cateId: {
        type: ObjectId,
        ref: "Category",
        required: true

    },
    image: {
        type: String,
    },
    quantity: {
        type: Number
    },
    shipping: {

        type: Boolean

    },
    // sold: {
    //     type: Number,
    //     default: 0
    // }
}, { timeStamps: true });
module.exports = mongoose.model("products", products)
