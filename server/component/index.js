const express = require('express');
const router = express.Router();

const postRouter = require('./post/post-routes');

router.use('/blog', postRouter);



module.exports = router;