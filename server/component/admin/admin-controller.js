const Post = require('../post/post');
const User = require('../auth/auth');
const Comment = require('../comment/comment');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError,BadRequestError,UnauthorizedError} = require('../../Errors')


const verifyUser = async(req,res) =>{
    const {id: userId} = req.params;

    const user = await User.findOne({_id: userId});
    if(!user){
        throw new NotFoundError('User doesnt exist')
    };
    if(user.activeUser === true){
       return res.status(StatusCodes.BAD_REQUEST).json({success:false, msg: 'User have been previously verified'}) 
    };
    
    user.activeUser = true,
    
    await user.save();
    return res.status(StatusCodes.OK).json({success:true, msg:'You have been verified'})
};

const getAllUsers = async(req,res) =>{
    const users = await User.find({role:'user'}).select('-password');
    return res.status(StatusCodes.OK).json({success: true,count: users.length, data: users });
};

const deleteUser = async(req,res) =>{
    const {id:userId} = req.params;
    
    const user = await User.findById({_id: userId});
    
    if(!user){
        throw new NotFoundError('There is no user with such id')
    }

    const delUser = await User.findByIdAndRemove(user);
    
    res.status(StatusCodes.OK).json({success:true, msg: 'user deleted'})

};

const deletePost = async(req,res) =>{
    const {id: postId} = req.params;
    console.log({_id:postId});


};

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
};

const createPost = async(req,res) =>{
    const {body,} = req.body;
    if(!body){
        throw new BadRequestError("Body of the post cannot be empty")
    }
    req.body.user = req.user.userId
    const post = await Post.create(req.body);
    return res.status(StatusCodes.CREATED).json({success: true, data: post})
    
};

const deleteComment = async(req,res) =>{
    const {id: commentId} = req.params;

    const comment = await Comment.findByIdAndDelete({_id: commentId});
    if(!comment){
        throw new BadRequestError("Comment already deleted")
    }
    res.status(StatusCodes.OK).json({msg: "Comment have been deleted successfully!"})
};

module.exports = {
    verifyUser,
    getAllUsers,
    deleteUser,
    createPost,
    deletePost,
    updatePost,
    deleteComment,
};