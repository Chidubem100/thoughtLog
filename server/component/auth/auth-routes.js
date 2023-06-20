const express = require('express');
const router = express.Router();

const {
    register,
    login,
    logout,
    showCurrentUser,
    forgotPassword,
    resetPassword,
} = require('./auth-controller');

const {authenticateUser} = require('../../middleware/authMiddleware');

router.post('/signup', register);
router.post('/login', login);
router.get('/showMe', authenticateUser, showCurrentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);


router.get('/logout', logout);



module.exports = router;