const express = require('express');
const router = express.Router();

const {

} = require('../controller/commentController');



router.route('/comment/new').get().post();
router.route('/:id').get().delete();






module.exports = router;