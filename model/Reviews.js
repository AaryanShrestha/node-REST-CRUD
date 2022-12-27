const mongoose = require ('mongoose');
const Users = require ('./Users'); 

const ReviewsSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    reviewDate: {
        type: Date,
        default: Date.now(),
        required: true
    },
    userReview: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Reviews", ReviewsSchema);