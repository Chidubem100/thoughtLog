const express = require('express');

const router = express.Router();

const {
    getAllPost,
    createPost,
    getSinglePost,
    updatePost,
    deletePost,
    uploadImage
} = require('./post-controller');


router.get('/', getAllPost);
router.post('/', createPost);
router.get('/:id', getSinglePost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/uploadImage', uploadImage);


module.exports = router;