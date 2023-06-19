const express = require('express');
const router = express.Router();
const {authenticateUser,authorizeUser} = require('../../middleware/authMiddleware')
const {verifyUser,getAllUsers,deleteUser,createPost,updatePost,deletePost,deleteComment} = require('./admin-controller');

router.get('/users', authenticateUser,authorizeUser('admin'), getAllUsers);
router.patch('/:id/verifyUser', verifyUser);
router.delete('/:id/deleteUser', authenticateUser, authorizeUser('admin'), deleteUser);
router.post('/', authenticateUser,authorizeUser('admin'),createPost);
router.patch('/:id', authenticateUser,authorizeUser('admin', 'moderator'),updatePost);
router.delete('/:id', authenticateUser,authorizeUser('admin', 'moderator'),deletePost);
router.delete('/:id', authenticateUser, authorizeUser("admin", "moderator"), deleteComment);

module.exports = router;