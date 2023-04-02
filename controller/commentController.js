const Comment = require('../models/commentModel');
const asyncWrapper = require('../middlewares/asyncWrapper');


const createComments = asyncWrapper(async(req,res) =>{

});

const createComment = asyncWrapper(async(req,res) =>{

});

const deleteComments = asyncWrapper(async(req,res) =>{

});

const deleteComment = asyncWrapper(async(req,res) =>{

});



module.exports = {
    createComment,
    createComments,
    deleteComment,
    deleteComments
}