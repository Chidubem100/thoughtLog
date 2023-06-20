const customErr = require('../../Errors');
const {StatusCodes} = require('http-status-codes')
const User = require('./auth');
const {createToken,attachCookiesToResponse} = require('../../utils/jwt');
const crypto = require('crypto');
const {sendResetPasswordMail} = require('../../utils/sendResetPasswordMail');
const createHash = require('../../utils/createHash');

const register = async(req,res) =>{
    const {email,password,username} = req.body;

    if(!email || !password || !username){
        throw new customErr.BadRequestError('Please provide the needed values')
    }

    const isEmailAlreadyExist = await User.findOne({email});
    if(isEmailAlreadyExist){
        throw new customErr.BadRequestError('Email already exist.')
    }

    const isUsernameAlreadyExist = await User.findOne({username});
    if(isUsernameAlreadyExist){
        throw new customErr.BadRequestError('Username already in existence. Pick another one')
    }

    const isFirstAcc = await User.countDocuments({}) === 0;
    const isSecond = await User.countDocuments({}) === 1;

    if (isFirstAcc) {
        const role = 'admin'
        const user = await User.create({email,username,password,role});
        console.log(user)
        const tokenUser = {username: user.username, userId: user._id, role: user.role}
        attachCookiesToResponse({res, user:tokenUser});
        return res.status(StatusCodes.CREATED).json({user: tokenUser});
    }else if(isSecond){
        const role = 'moderator'
        const user = await User.create({email,username,password,role});
        console.log(user)
        const tokenUser = {username: user.username, userId: user._id, role: user.role}
        attachCookiesToResponse({res, user:tokenUser});
        return res.status(StatusCodes.CREATED).json({user: tokenUser});
    }else{
        const role = 'user'
        const user = await User.create({email,username,password,role});
        console.log(user)
        const tokenUser = {username: user.username, userId: user._id, role: user.role}
        attachCookiesToResponse({res, user:tokenUser});
        return res.status(StatusCodes.CREATED).json({user: tokenUser});
    }
}



const login = async(req,res) =>{
    const {email,password} = req.body;

    if(!email || !password){
        throw new customErr.BadRequestError('Please provide the needed values')
    }

    const user = await User.findOne({email});
    if(!user){
        throw new customErr.BadRequestError('Invalid credentials. Try again')
    }

    console.log(user)
    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new customErr.BadRequestError('Invalid credentials. Try again')
    }

    const tokenUser = {username: user.username, userId: user._id, role: user.role}
    attachCookiesToResponse({res, user:tokenUser});
    return res.status(StatusCodes.CREATED).json({user: tokenUser});
};

const showCurrentUser = async(req,res) =>{
    res.status(StatusCodes.OK).json({user: req.user})
};

const forgotPassword = async(req,res) =>{
    const {email} = req.body;
    // const {id:userId} = req.params;

    if(!email){
        throw new customErr.BadRequestError("Please input your email")
    }

    const user = await User.findOne({email})

    if(user){
        const passwordToken = crypto.randomBytes(70).toString('hex');
        
        const origin = 'http://localhost:3000'; // will change this to product root url for frontend 
        await sendResetPasswordMail({
            username: user.username,
            email: user.email,
            token: passwordToken,
            origin
        });

        const fiveMin = 1000 * 60 * 5;
        const tokenExpirationDate = new Date(Date.now() + fiveMin);

        user.passwordToken = createHash(passwordToken);
        user.passwordTokenExpirationDate = tokenExpirationDate;
        
        await user.save();
        // res.status(StatusCodes.CREATED).json({user:user.email, passwordToken}); // will remove this in production
    }
   return res.status(StatusCodes.OK).json({msg: `Please check your email for rest password link`});
};

const resetPassword = async(req,res) =>{
    const {token,password,email, confirmPassword} = req.body;

    if(!token || !password || !email){
        throw new customErr.BadRequestError("Provide the needed credential(s)")
    }

    const user = await User.findOne({email});

    if(user){
        const currentDate = new Date
        if(password !== confirmPassword){
            throw new customErr.BadRequestError("Password does not match confirm password")
        }

        if(
            user.passwordToken === createHash(token) &&
            user.passwordTokenExpirationDate > currentDate
        ){
            user.password = password,
            user.passwordToken = null,
            user.passwordTokenExpirationDate = null
        }
        await user.save();
        res.status(StatusCodes.OK).json({msg: 'Password have been reseted successfully'});
    }
};

const logout = async(req,res) =>{
    res.cookie("token", "logout", {
        http: true,
        expires: new Date(Date.now() + 500)
    });
    res.status(200).json({msg: "User logged out!!!"})
};

module.exports = {
    register,
    login,
    showCurrentUser,
    forgotPassword,
    resetPassword,
    logout
};
