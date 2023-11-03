const Post = require('../post/post');
const User = require('../auth/auth');
const Comment = require('../comment/comment');
const {StatusCodes} = require('http-status-codes');
const {NotFoundError,BadRequestError,UnauthorizedError} = require('../../Errors')
const {cloudinaryDelete} = require('../../utils/cloudinaryConfig');
const fs = require('fs');
const sendUserVerificationEmail = require('../../utils/sendUserVerificationMail');

const verifyUser = async(req,res) =>{
    const {id: userId} = req.params;

    const user = await User.findOne({_id: userId});
    if(!user){
        throw new NotFoundError('User doesnt exist')
    };
    if(user.activeUser === true){
       return res.status(StatusCodes.BAD_REQUEST).json({success:false, msg: 'User have been previously verified'}) 
    };
    
    await sendUserVerificationEmail({
        username: user.username, 
        email: user.email
    });

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

// const deletePost = async(req,res) =>{
//     const {id: postId} = req.params;
//     console.log({_id:postId});

//     const post = Post.findOne({_id: postId})
//     // console.log(post)
//     if(!post){
//         throw new BadRequestError("There is no post with such id")
//     }

//     // if (post.image) cloudinaryDelete(post.image) // delete the posts pic before deleting post
//     await post.deleteOne();
//     // const pPost = await Post.findByIdAndRemove({_id:postId});
//     // await post.remove();
//     // await post.findOneAndRemove(req.params.id)
//     res.status(StatusCodes.OK).json({msg: `Post deleted successfully`});

// };
const deletePost = async (req, res) => {
    
    const {
        params: {id: postId},
        user: {userId}
    } = req;

    const post = await Post.findById({_id:postId, user:userId});

    
    if(!post) {
        throw new Error("Post cannot be deleted!")
        // throw new CustomApiError.NotFoundError('Post not found with id ' + postId);
    }
    if (post.image) cloudinaryDelete(post.image);
    await post.deleteOne();
    // await post.remove();
    res.status(StatusCodes.OK).json({success: true, message: 'Post deleted successfully'});
}

const updatePost = async(req,res) =>{
    const {id: postId} = req.params;

    const newPost = req.body;
    const oldPost = await Post.findById(postId);
    
    if (req.file) {
        if (oldPost.image) cloudinaryDelete(oldPost.image)
        newPost.image = req.file.path
    }
    const post = await Post.findByIdAndUpdate({_id:postId }, newPost,{
        new: true,
        runValidators: true
    });
    
    res.status(StatusCodes.OK).json({success:true, data: post});
};

const createPost = async(req,res) =>{
    const {body} = req.body;
    
    if(!body){
        throw new BadRequestError("Body of the post cannot be empty")
    }
    req.body.user = req.user.userId

    if (req.file) req.body.image = req.file.path;
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

const getAllComment = async(req,res) =>{
    const comment = await Comment.find({}).populate({path: "post"}).populate({path:"user", select: "username"});

    if(comment.length < 1){
        return res.status(StatusCodes.OK).json({msg: "There is no comments available"});
    }
    res.status(StatusCodes.OK).json({success:true, data: comment});
};

module.exports = {
    verifyUser,
    getAllUsers,
    deleteUser,
    createPost,
    deletePost,
    updatePost,
    deleteComment,
    getAllComment,
};