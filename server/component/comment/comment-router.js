const express = require('express');
const router = express.Router();

const { authenticateUser} = require('../../middleware/authMiddleware');
const {createComment,updateComment,getAllComment} = require('./comment-controller');


router.get('/',authenticateUser,getAllComment);
router.post('/create', authenticateUser, createComment);
router.patch('/:id', authenticateUser, updateComment);
// router.get()


module.exports = router;