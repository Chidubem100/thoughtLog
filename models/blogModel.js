
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minLength: [2, 'Title should not be less than 2 characters'],
        maxLength: [50, 'Title sjould not be more than 50 characters'],
        trim: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
    },
    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'User',
    //     required: true,
    // }
},{timestamps: true});



module.exports = mongoose.model('Blog', blogSchema);