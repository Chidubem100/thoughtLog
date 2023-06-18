const express = require('express');

const router = express.Router();
const {authenticateUser, authorizeUser} = require('../../middleware/authMiddleware');
const { upload } = require("../cloudinary/cloudinaryController");
const {
    getAllPost,
    createPost,
    getSinglePost,
    updatePost,
    deletePost,
} = require('./post-controller');


router.get('/', getAllPost);

// upload.single() uploads the pic.

// ensure the parameter passed is the same as your file input
// name attribute in your HTML. As in, your input field should take 
// a name of "image" in this case or it will throw an error

// after uploading the pic, it adds a file object to the request before 
// it reaches the post controller.
router.post('/', authenticateUser,authorizeUser('admin'), upload.single("image"), createPost);
router.get('/:id', authenticateUser,getSinglePost);
router.patch('/:id', authenticateUser,authorizeUser('admin', 'moderator'), upload.single("image"),updatePost);
router.delete('/:id', authenticateUser,authorizeUser('admin', 'moderator'),deletePost);


module.exports = router;