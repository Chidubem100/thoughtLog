const express = require('express');

const router = express.Router();
const {authenticateUser, authorizeUser} = require('../../middleware/authMiddleware');
const {
    getAllPost,
    getSinglePost,
    uploadImage
} = require('./post-controller');

const { getSinglePostComments} = require('../comment/comment-controller');


router.get('/', getAllPost);
router.get('/:id/comments', authenticateUser, getSinglePostComments);
router.get('/:id', authenticateUser,getSinglePost);
router.post('/uploadImage',authenticateUser,authorizeUser('admin'),uploadImage);


module.exports = router;