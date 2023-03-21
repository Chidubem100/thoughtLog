
const asyncWrapper = require('../middlewares/asyncWrapper');
const Blog = require('../models/blogModel');


const getAllPosts = asyncWrapper(async(req,res) =>{
    res.send('get all posts')
});

const createPost = asyncWrapper(async(req,res) =>{
    res.send('create Post')
});

const createPosts = asyncWrapper(async(req,res) =>{
    res.send('create posts')
});

const editPost = asyncWrapper(async(req,res) =>{
    res.send('edit posts')
});

const editPosts = asyncWrapper(async(req,res) =>{
    res.send('edit post')
});

const getSinglePost  = asyncWrapper(async(req,res) =>{
    res.send('get single post')
});

const deletePost = asyncWrapper(async(req,res) =>{
    res.send('delete post')
});

const uploadImage = asyncWrapper(async(req,res) =>{
    res.send('image upload')
});




module.exports = {
    createPost,
    createPosts,
    getAllPosts,
    getSinglePost,
    editPost,
    editPosts,
    uploadImage,
    deletePost
}