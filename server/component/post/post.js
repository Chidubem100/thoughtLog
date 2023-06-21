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

postSchema.virtual('comment', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post',
    justOne: false,
});

// postSchema.pre('deleteOne', {document:false, query:true},async function(next){
//     console.log('deleting comment')
//     await this.model('Comment').deleteMany({post: this.id}, next);
//     // await this.model('Review').deleteMany({product: this._id});
//     next();
//     // await this.model('Comment').deleteMany({post: this.id}, next);
// });

postSchema.pre('deleteOne',async function(next){
    
    console.log('deleting comment')
    // const postId = this.getQuery()["_id"];

    // await this.model('Comment').deleteMany({'post':postId}, functiion(err,result) {
    //     if(err){
    //         console.log(err)
    //     }else {
    //         console.log('success')
    //         next()
    //     }
    // });

    // await this.model("Comment").deleteMany({post:postId}, (err,result) =>{
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log('success')
    //         next();
    //     }
    // })
    
    // next();
    await this.model('Comment').deleteMany({post: this.id});
});

module.exports = mongoose.model("Post", postSchema);