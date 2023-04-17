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
} = require('../controller/blogController');



router.route('/').get(getAllPosts);
router.route('/new').get(authenticateUser,createPost).post(createPosts);
router.route('/blog/:id').get(authenticateUser,getSinglePost).put(authenticateUser,authorizeUser('admin'),editPosts).delete(authenticateUser,authorizeUser('admin'),deletePost);
router.route('/blog/:id/edit').get(authenticateUser,authorizeUser('admin'),editPost)


module.exports = router;