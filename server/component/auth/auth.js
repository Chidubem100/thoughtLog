const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: [30, 'Username cannot be more than 30 characters'],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: "Please provide a valid email"
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "moderator", "user"],
        default: "user"
    },
    activeUser: {
        type: Boolean,
        required: true,
        default: false
    },
    passwordToken: {
        type: String
    },
    passwordTokenExpirationDate: {
        type: Date,
    }
},{timestamps: true});

userSchema.pre("save", async function(){
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

module.exports = mongoose.model('User', userSchema);


