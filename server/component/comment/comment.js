const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true,
        minLength: [1, "Comment cannot be empty"]
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
});


module.exports = mongoose.model('Comment', commentSchema);