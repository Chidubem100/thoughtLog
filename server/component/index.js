const express = require('express');
const router = express.Router();

const postRouter = require('./post/post-routes');
const authRouter = require('./auth/auth-routes');


router.use('/blog', postRouter);
router.use('/auth', authRouter);


module.exports = router;