const customErr = require('../../Errors');
const {StatusCodes} = require('http-status-codes')
const User = require('./auth');
const {attachCookiesToResponse} = require('../../utils/jwt');
const crypto = require('crypto');
const {sendResetPasswordMail} = require('../../utils/sendResetPasswordMail');
const createHash = require('../../utils/createHash');
const jwt = require('jsonwebtoken')

const register = async(req,res) =>{
    const {email,password,username} = req.body;

    if(!email || !password || !username){
        throw new customErr.BadRequestError('Please provide the needed values')
    }

    if(password.length < 6){
        throw new customErr.BadRequestError("Password should be longer than 6 characters")
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
        const userPayload = {username: user.username, userId: user._id, role: user.role}
        const accessToken = jwt.sign(userPayload, process.env.SECRETE,{expiresIn:'6m'});

        res.cookie('accessToken', accessToken, {signed:true,httpOnly:true,secure:false, maxAge: 60*60*60*1000})
        
        return res.status(StatusCodes.CREATED).json({success:true, userPayload,accessToken})

    }else if(isSecond){
        const role = 'moderator'
        const user = await User.create({email,username,password,role});
        const userPayload = {username: user.username, userId: user._id, role: user.role}
        const accessToken = jwt.sign(userPayload, process.env.SECRETE,{expiresIn:'1m'});            
        res.cookie('accessToken', accessToken, {signed:true,httpOnly:true,secure:false, maxAge: 60*60*60*1000})    
       return res.status(StatusCodes.CREATED).json({success:true, userPayload,accessToken})
    }else{
        const role = 'user'
        const user = await User.create({email,username,password,role});
        const userPayload = {username: user.username, userId: user._id, role: user.role};            
        const accessToken = jwt.sign(userPayload, process.env.SECRETE,{expiresIn:'1m'});

        res.cookie('accessToken', accessToken, {signed:true,httpOnly:true,secure:false, maxAge: 60*60*60*1000})
        
        return res.status(StatusCodes.CREATED).json({success:true, userPayload,accessToken})
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

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new customErr.BadRequestError('Invalid credentials. Try again')
    }

    const userPayload = {username: user.username, userId: user._id, role: user.role}
    const accessToken = jwt.sign(userPayload, process.env.SECRETE,{expiresIn:'80h'});

    res.cookie('accessToken', accessToken, {signed:true,httpOnly:true,secure:false, maxAge: 60*60*60*1000})


    return res.status(StatusCodes.CREATED).json({success:true, userPayload,accessToken})
    
};

const getAccessToken = (req,res) =>{
    const refreshToken = req.body.refreshToken;
    jwt.verify(refreshToken, process.env.SECRETE, (err,user) =>{
        if(err){
            return res.status(403).json({success:false, msg: 'Refresh token invalid'})
        }
        // generate new accessToken
        const userDetails = {username: user.username,}
        const accessToken = jwt.sign(tokenUser, process.env.SECRETE,{expiresIn:'6d'});
        res.status(201).json({success:true, userDetails,accessToken})
    })
}

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
    getAccessToken,
    showCurrentUser,
    forgotPassword,
    resetPassword,
    logout
};
