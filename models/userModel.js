const validator = require('validator');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    email: {
        type:String,
        required: [true, 'Please provide a valid emal'],
        validate: {validator: validator.isEmail, message:'Please provide a valid email'},
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20,
        trim: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ['user', 'moderator', 'admin'],
    },

});

module.exports = mongoose.model('User', UserSchema);