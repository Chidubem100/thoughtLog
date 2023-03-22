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



router.route('/').get(getAllPosts);
router.route('/new').get(createPost).post(createPosts);
router.route(':/id').get(getSinglePost).get(editPost).post(editPosts).delete(deletePost);



module.exports = router;