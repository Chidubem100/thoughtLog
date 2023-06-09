
const express = require('express');
const router = express.Router();

const {
    register,
    login,
    mRegister,
    mLogin,
    logout,
    changePassword,
    cPassword
} = require('../../controller/userController');

const {authenticateUser, authorizeUser} = require('../middlewares/authMiddleware');

router.route('/changePassword').get(authenticateUser,cPassword).post(authenticateUser,changePassword);
router.route('/signup').get(register).post(mRegister);
router.route('/login').get(login).post(mLogin);
router.route('/logout').get(logout);


module.exports = router;