const mongoose = require ('mongoose');

const Users = require ('./Users');
const Reviews = require ('./Reviews');

const ProductsSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    reviewID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reviews',
        required: true
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productDescription: {
        type: String,
        required: false
    },
    postedDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Products", ProductsSchema);