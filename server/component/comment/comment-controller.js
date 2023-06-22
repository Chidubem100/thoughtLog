const Comment = require('./comment');
const {BadRequestError, NotFoundError,UnauthorizedError} = require('../../Errors');
const {StatusCodes} = require("http-status-codes");

const createComment = async(req,res) =>{
    const { comment} = req.body;
    console.log(typeof req.body)
    if(!comment){
        throw new BadRequestError("Comment body cannot be empty")
    }
    req.body.user = req.user.userId;
    const Ccomment = await  Comment.create(req.body);
    console.log(typeof req.body)
    console.log(typeof Ccomment)
    res.status(StatusCodes.OK).json({sucesss:true, data: Ccomment})
};

const updateComment = async(req,res) =>{
    const {id: commentId} = req.params;
    const {comment} = req.body;

    const Ucomment = await Comment.findOne({_id: commentId});
    
    if(!Ucomment){
        throw new NotFoundError(`There is no comment with id ${commentId}`)
    }
    if(!Ucomment.user._id.equals(req.user.userId)){
        throw new UnauthorizedError('Cannot perform this action now!!')
    }
    Ucomment.comment = comment;

    await Ucomment.save();
    res.status(StatusCodes.OK).json({success: true, data: Ucomment});
};


const getSinglePostComments = async(req,res) =>{
    const {id: postId} = req.params;
    const comment = await Comment.find({post: postId}).populate({path: 'user', select: 'username'});
    
    if(comment.length < 1){
       return res.status(StatusCodes.OK).json({msg: "There are no available comments now"})
    }
    res.status(StatusCodes.OK).json({success:true, count: comment.length, data: comment})
};

module.exports = {
    createComment,
    updateComment,
    getSinglePostComments,    
}
