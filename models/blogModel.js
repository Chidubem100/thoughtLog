
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [2, 'Title should not be less than 2 characters'],
        maxLength: [50, 'Title sjould not be more than 50 characters'],
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
    ]
    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // }
},{timestamps: true});



module.exports = mongoose.model('Blog', blogSchema);