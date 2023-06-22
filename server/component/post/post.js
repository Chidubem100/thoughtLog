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
    },
},{timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}});


postSchema.virtual('comment',{
    ref: 'Comment',
    justOne: false,
    foreignField: 'post',
    localField: '_id'
});

// this deletes all comment associated to a post when deleted
postSchema.pre('deleteOne', {document:true},async function(next){
    console.log('deleting comment')
    await this.model('Comment').deleteMany({post: this._id});
});

module.exports = mongoose.model("Post", postSchema);