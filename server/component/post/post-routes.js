const express = require('express');

const router = express.Router();
const {authenticateUser, authorizeUser} = require('../../middleware/authMiddleware');
const {
    getAllPost,
    createPost,
    getSinglePost,
    updatePost,
    deletePost,
    uploadImage
} = require('./post-controller');


router.get('/', getAllPost);
router.post('/', authenticateUser,authorizeUser('admin'),createPost);
router.get('/:id', authenticateUser,getSinglePost);
router.patch('/:id', authenticateUser,authorizeUser('admin', 'moderator'),updatePost);
router.delete('/:id', authenticateUser,authorizeUser('admin', 'moderator'),deletePost);
router.post('/uploadImage',authenticateUser,authorizeUser('admin'),uploadImage);


module.exports = router;