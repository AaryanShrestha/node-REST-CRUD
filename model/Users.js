const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    userRole: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer',
        required: true
    },
    userName: {
        type: String,
        toLowerCase: true,
        minLength: 3,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        trim: true
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Users", UsersSchema);