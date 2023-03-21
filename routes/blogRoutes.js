const express = require('express');
const router = express.Router();

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







module.exports = router;