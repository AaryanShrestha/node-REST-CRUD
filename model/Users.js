const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['admin', 'customer', 'vendor'],
        default: 'customer',
        required: true
    },
    userName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        tolowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    contact: {
        type: String,
        minLength: 10,
        maxLength: 10
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    createdDate: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Users", UsersSchema);