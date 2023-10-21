const express = require('express');
const router = express.Router();

const {
    register,
    login,
    getAccessToken,
    logout,
    showCurrentUser,
    forgotPassword,
    resetPassword,
} = require('./auth-controller');

const {VerifyAccessToken} = require('../../middleware/authMiddleware');

router.post('/signup', register);
router.post('/login', login);
router.post('/refresh-token', getAccessToken);
router.get('/showMe', VerifyAccessToken, showCurrentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.route('/showMe').get(VerifyAccessToken, showCurrentUser);

router.get('/logout', logout);



module.exports = router;