const mongoose = require ('mongoose');

const Users = require ('./Users');
const Reviews = require ('./Reviews');
const Products = require ('./Products');

const OrdersSchema = new mongoose.Schema ({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    reviewID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews',
        required: true
    },
    orderDate: {
        types: Date,
        default: Date.now()
    },
    productQuantity: {
        type: Number,
        min: 1
    }
});


module.exports = mongoose.model ("Orders", OrdersSchema);