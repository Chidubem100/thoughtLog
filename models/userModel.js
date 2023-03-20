const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    email: {
        type:String,
        required: [true, 'Please provide a valid email'],
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
        // required: true,
        minLength: 7,
    },
    role: {
        type: String,
        required: true,
        default: "user",
        enum: ['user', 'moderator', 'admin'],
    },

});

UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

UserSchema.methods.createJwt = function() {
    return jwt.sign(
        {userId: this._id, username: this.username},
        'secrete',
        { expiresIn: process.env.JwtLifeTime}
    )
};

UserSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', UserSchema);