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

const createPost = async(req,res) =>{
    const {body,} = req.body;
    if(!body){
        throw new BadRequestError("Body of the post cannot be empty")
    }
    console.log(req)
    req.body.user = req.user.userId
    const post = await Post.create(req.body);
    return res.status(StatusCodes.CREATED).json({success: true, data: post})
    
}

const updatePost = async(req,res) =>{
    const {id: postId} = req.params;
    const {id: userId} = req.user;

    const post = await Post.findByIdAndUpdate({_id:postId,userId }, req.body,{
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
    const post = await Post.findOne({_id: postId}).populate('comment')

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
    await post.deleteMany();
    return res.send('deleted successfully')
}

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
    createPost,
    updatePost,
    getSinglePost,
    deletePost,
    uploadImage
}