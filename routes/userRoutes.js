
const express = require('express');
const router = express.Router();

const {
    register,
    login,
    mRegister,
    mLogin,
} = require('../controller/userController');


router.route('/signup').get(register).post(mRegister);
router.route('/login').get(login).post(mLogin);


module.exports = router;