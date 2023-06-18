const Post = require('./post');
const {BadRequestError, NotFoundError} = require('../../Errors');
const {StatusCodes} = require('http-status-codes');
const { cloudinaryDelete } = require("../cloudinary/cloudinaryController");
const fs = require('fs');

const getAllPost = async(req,res) =>{
    const post = await Post.find({});

    res.status(StatusCodes.OK).json({success:true, count: post.length,data: post})
    
}

const createPost = async(req,res) =>{
    // req.file is now available
    const {body} = req.body;
    if(!body){
        throw new BadRequestError("Body of the post cannot be empty")
    }

    req.body.user = req.user.userId

    // access url to saved image with req.file.path and add it
    // to your request body before saving
    if (req.file) req.body.image = req.file.path

    const post = await Post.create(req.body);
    return res.status(StatusCodes.CREATED).json({success: true, data: post})
    
}

const updatePost = async(req,res) =>{
    const {id: postId} = req.params;
    // const {id: userId} = req.user;
    const newPost = req.body
    const oldPost = await Post.findById(postId)

    // if picture uploaded, check if old post has image url, then delete old pic from cloudinary
    // and set new pic url
    if (req.file) {
        if (oldPost.image) cloudinaryDelete(oldPost.image)
        newPost.image = req.file.path
    }

    const post = await Post.findByIdAndUpdate({_id:postId }, newPost,{
        new: true,
        runValidators: true
    });

    if(!post){
        throw new NotFoundError(`There is no post with such id ${postId}`)
    }

    res.status(StatusCodes.OK).json({success:true, data: post});
}

const getSinglePost = async(req,res) =>{
    const {id: postId} = req.params;
    const post = await Post.findOne({_id: postId});

    if(!post){
        throw new NotFoundError(`There is no post with id ${postId}`)
    }

    res.status(StatusCodes.OK).json({success:true, data: post})
};

const deletePost = async(req,res) =>{
    const {id: postId} = req.params;

    const post = await Post.findOne({_id: postId});
    
    if(!post){
        throw new NotFoundError(`There is no post with id ${postId}`)
    }

    if (post.image) cloudinaryDelete(post.image) // delete the posts pic before deleting post
    
    await post.deleteOne();
    // await post.remove();
    return res.send('deleted successfully')
}

module.exports = {
    getAllPost,
    createPost,
    updatePost,
    getSinglePost,
    deletePost,
}