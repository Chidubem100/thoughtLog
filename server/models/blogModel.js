
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
    },
    bod: {
        type: String,
        trim: true,
    },
    image: {
        type: String,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
},{timestamps: true});



module.exports = mongoose.model('Blog', blogSchema);