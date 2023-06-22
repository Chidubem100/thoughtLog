const express = require('express');
const router = express.Router();
const {authenticateUser,authorizeUser} = require('../../middleware/authMiddleware')
const {verifyUser,getAllUsers,deleteUser,createPost,updatePost,deletePost,deleteComment,getAllComment} = require('./admin-controller');
const {upload} = require('../../utils/cloudinaryConfig');


router.get('/allComment', authenticateUser, authorizeUser('admin',"moderator"), getAllComment);
router.get('/users', authenticateUser,authorizeUser('admin'), getAllUsers);
router.patch('/:id/verifyUser', authenticateUser, authorizeUser("admin"),verifyUser);
router.delete('/:id/deleteUser', authenticateUser, authorizeUser('admin'), deleteUser);
router.post('/', authenticateUser,authorizeUser('admin'), upload.single("image"),createPost);
router.patch('/:id', authenticateUser,authorizeUser('admin', 'moderator'), upload.single("image"),updatePost);
router.delete('/:id', authenticateUser,authorizeUser('admin', 'moderator'),deletePost);
router.delete('/:id/deleteComment', authenticateUser, authorizeUser("admin"), deleteComment);

module.exports = router;