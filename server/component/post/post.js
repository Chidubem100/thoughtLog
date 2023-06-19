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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true}});

postSchema.virtual('comment', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post',
    justOne: false,
});

postSchema.pre('deleteOne', {document:false, query:true},async function(next){
    console.log('deleting comment')
    next();
    // await this.model('Comment').deleteMany({post: this.id}, next);
});

module.exports = mongoose.model("Post", postSchema);