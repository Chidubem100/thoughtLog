// const Post = require('');
const BadRequestError = require('../../Errors');
const {StatusCodes} = require('http-status-codes')

const getAllPost = async(req,res) =>{
    res.status(StatusCodes.OK).json({msg: 'get all post'})
}

const createPost = async(req,res) =>{
    res.status(StatusCodes.OK).json({msg: 'create new post'})
}




module.exports = {
    getAllPost,
    createPost,
}