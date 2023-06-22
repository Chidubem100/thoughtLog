const express = require('express');
const router = express.Router();

const { authenticateUser} = require('../../middleware/authMiddleware');
const {createComment,updateComment} = require('./comment-controller');


router.post('/create', authenticateUser, createComment);
router.patch('/:id', authenticateUser, updateComment);
// router.post('/', createComments);

module.exports = router;