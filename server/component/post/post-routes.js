const express = require('express');

const router = express.Router();

const {
    getAllPost,
    createPost
} = require('./post-controller');


router.get('/', getAllPost);
router.post('/', createPost);



module.exports = router;