
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    }
},{timestamps:true});


module.exports = mongoose.model('Comment', commentSchema);