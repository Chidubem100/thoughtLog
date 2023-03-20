
const express = require('express');
const router = express.Router();

const {
    register,
    login,
    mRegister,
    mLogin,
    logout
} = require('../controller/userController');


router.route('/signup').get(register).post(mRegister);
router.route('/login').get(login).post(mLogin);
router.route('/logout').get(logout);


module.exports = router;