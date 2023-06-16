const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        minLength: 1,
        trim: true,
    },
    body: {
        type: String,
        required: true,
        minLength: 2,
        trim: true,
    },
    image: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}});

// postSchema.virtual('', {
//     ref: '',
//     localField: '_id',
//     foreignField: 'post',
//     justOne: true
// });

// postSchema.pre('remove', async function(next) {
    // await this.model('').deleteMany({post: this._id})
// });

module.exports = mongoose.model("Post", postSchema);