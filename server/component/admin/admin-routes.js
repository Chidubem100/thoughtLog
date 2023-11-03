const express = require('express');
const router = express.Router();
const {authorizeUser,VerifyAccessToken} = require('../../middleware/authMiddleware')
const {verifyUser,getAllUsers,deleteUser,createPost,updatePost,deletePost,deleteComment,getAllComment,getAllPost} = require('./admin-controller');
const {upload} = require('../../utils/cloudinaryConfig');


router.get('/allComment', VerifyAccessToken, authorizeUser('admin',"moderator"), getAllComment);
router.get('/users', VerifyAccessToken, authorizeUser('admin'), getAllUsers);
router.get('/blog/', VerifyAccessToken,authorizeUser("admin"),getAllPost);
router.patch('/:id/verifyUser', VerifyAccessToken,authorizeUser("admin"),verifyUser);
router.delete('/:id/deleteUser',  VerifyAccessToken,authorizeUser('admin'), deleteUser);
router.post('/', VerifyAccessToken,authorizeUser('admin'), upload.single("image"),createPost);
router.patch('/:id', VerifyAccessToken,authorizeUser('admin', 'moderator'), upload.single("image"),updatePost);
router.delete('/:id', VerifyAccessToken,authorizeUser('admin', 'moderator'),deletePost);
router.delete('/:id/deleteComment', VerifyAccessToken, authorizeUser("admin"), deleteComment);

module.exports = router;