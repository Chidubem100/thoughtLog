const express = require('express');
const router = express.Router();
const Blog = require('../models/blogModel')

const {authenticateUser, authorizeUser} = require('../middlewares/authMiddleware');

const {
    getAllPosts,
    getSinglePost,
    createPost,
    createPosts,
    editPost,
    editPosts,
    deletePost,
    uploadImage
} = require('../controller/blogController');



router.route('/').get(getAllPosts);
router.route('/new').get(createPost).post(createPosts);
// router.get('/blog/:id',getSinglePost);
router.route('/blog/:id').get(getSinglePost).put(editPosts).delete(deletePost);
router.route('/blog/:id/edit').get(editPost)


module.exports = router;