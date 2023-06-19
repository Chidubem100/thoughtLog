const express = require('express');
const router = express.Router();
const {authenticateUser,authorizeUser} = require('../../middleware/authMiddleware')
const {verifyUser,getAllUsers,deleteUser,createPost,updatePost,deletePost,deleteComment} = require('./admin-controller');
const {upload} = require('../../utils/cloudinaryConfig');


router.get('/users', authenticateUser,authorizeUser('admin'), getAllUsers);
router.patch('/:id/verifyUser', verifyUser);
router.delete('/:id/deleteUser', authenticateUser, authorizeUser('admin'), deleteUser);
router.post('/', authenticateUser,authorizeUser('admin'), upload.single("image"),createPost);
router.patch('/:id', authenticateUser,authorizeUser('admin', 'moderator'), upload.single("image"),updatePost);
router.delete('/:id', authenticateUser,authorizeUser('admin', 'moderator'),deletePost);
router.delete('/:id', authenticateUser, authorizeUser("admin", "moderator"), deleteComment);

module.exports = router;