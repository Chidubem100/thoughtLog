const Post = require('./post');
const {BadRequestError, NotFoundError} = require('../../Errors');
const {StatusCodes} = require('http-status-codes')

const getAllPost = async(req,res) =>{
    const post = await Post.find({});

    res.status(StatusCodes.OK).json({success:true, count: post.length,data: post})
    
}

const createPost = async(req,res) =>{
    const {title,body,} = req.body;
    if(!body){
        throw new BadRequestError("Body of the post cannot be empty")
    }

    req.body.user = req.user.userId
    const post = await Post.create(req.body);
    return res.status(StatusCodes.CREATED).json({success: true, data: post})
    
}

const updatePost = async(req,res) =>{
    const {id: postId} = req.params


    // res.status(200).json({msg: "update route"})
}

const getSinglePost = async(req,res) =>{
    const {id: postId} = req.params;

    const post = await Post.findById(req.params.id);
    res.status(StatusCodes.OK).json({success:true, data: post})
    // res.status(200).json({msg: "get a single post route"})
}

const deletePost = async(req,res) =>{
    res.status(200).json({msg: "delete post"})
}

const uploadImage = async(req,res) =>{
    res.status(201).json({msg: "upload image"})
}

module.exports = {
    getAllPost,
    createPost,
    updatePost,
    getSinglePost,
    deletePost,
    uploadImage
}