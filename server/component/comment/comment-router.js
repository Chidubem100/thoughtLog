const express = require('express');
const router = express.Router();

const { authenticateUser, authorizeUser} = require('../../middleware/authMiddleware');
const {createComment,updateComment,getAllComment,deleteComment} = require('./comment-controller');


router.get('/',authenticateUser,getAllComment);
router.post('/create', authenticateUser, createComment);
router.patch('/:id', authenticateUser, updateComment);
router.delete('/:id', authenticateUser, authorizeUser("admin", "moderator"), deleteComment);


module.exports = router;