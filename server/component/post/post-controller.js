const Post = require('./post');
const {BadRequestError, NotFoundError} = require('../../Errors');
const {StatusCodes} = require('http-status-codes');

const shufflePost = (val) =>{
    for (let i = val.length-1; i > 0; i--) {
        const element = Math.floor(Math.random() * i)
        const tempArr = val[i]
        val[i] = val[element]
        val[element] = tempArr        
    }
}

// for (let i = posts.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * i);
//     const temp = posts[i];
//     posts[i] = posts[j];
//     posts[j] = temp;
// }


const getAllPost = async(req,res) =>{
    const post = await Post.find({});

    shufflePost(post)

    res.status(StatusCodes.OK).json({success:true, count: post.length,data: post})
    
}

const getSinglePost = async(req,res) =>{
    const {id: postId} = req.params;
    const post = await Post.findOne({_id: postId}).populate('comment')

    if(!post){
        throw new NotFoundError(`There is no post with id ${postId}`)
    }

    res.status(StatusCodes.OK).json({success:true, data: post})
};

module.exports = {
    getAllPost,
    getSinglePost,
}