const express = require('express');
const router = express.Router();

const postRouter = require('./post/post-routes');
const authRouter = require('./auth/auth-routes');
const commentRouter = require('./comment/comment-router');
const adminRouter = require('./admin/admin-routes');

router.use('/blog', postRouter);
router.use('/auth', authRouter);
router.use('/comment', commentRouter);
router.use('/admin', adminRouter);

module.exports = router;