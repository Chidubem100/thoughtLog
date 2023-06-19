const Post = require('./post');
const {BadRequestError, NotFoundError} = require('../../Errors');
const {StatusCodes} = require('http-status-codes');
const Cloudinary = require('cloudinary').v2;
const fs = require('fs');

Cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUDAPI_SECRETE,
});

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

const uploadImage = async(req,res) =>{

    console.log(req.files)

    const result = await Cloudinary.uploader.upload(
        req.files.file.path,
        {
            use_filename: true,
            folder: 'thoughtLog-fileUpload'
        }
    );

    fs.unlinkSync(req.file.image.tempFilePath);
    return res.status(StatusCodes.OK).json({image: {src: result.secure_url }})
    
}

module.exports = {
    getAllPost,
    getSinglePost,
    uploadImage
}