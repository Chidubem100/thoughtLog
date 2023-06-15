const customErr = require('../../Errors');
const {StatusCodes} = require('http-status-codes')
const User = require('./auth');
const {createToken,attachCookiesToResponse} = require('../../utils/jwt');


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
    // console.log(req.body);
}

const logout = async(req,res) =>{
    res.cookie("token", "logout", {
        http: true,
        expires: new Date(Date.now() + 500)
    });
    res.status(200).json({msg: "User logged out!!!"})
}

module.exports = {
    register,
    login,
    logout
}
