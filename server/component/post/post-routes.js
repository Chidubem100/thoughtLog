const express = require('express');

const router = express.Router();
// const {VerifyAccessToken} = require('../../middleware/authMiddleware');
const {
    getAllPost,
    getSinglePost,
} = require('./post-controller');

const { getSinglePostComments} = require('../comment/comment-controller');


router.get('/', getAllPost);
router.get('/:id/comments', getSinglePostComments);
router.get('/:id',getSinglePost);

module.exports = router;