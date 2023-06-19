const Post = require('./post');
const {BadRequestError, NotFoundError} = require('../../Errors');
const {StatusCodes} = require('http-status-codes');

const getAllPost = async(req,res) =>{
    const post = await Post.find({});

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