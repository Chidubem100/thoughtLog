
const asyncWrapper = require('../middlewares/asyncWrapper');
const User = require('../models/userModel');


// sign up
const register = asyncWrapper(async(req,res) =>{
    res.render('user/signUp');
});

const mRegister = asyncWrapper(async(req,res) =>{
    
    const {email,username,password} = req.body;

    const emailAlreadyExist = await User.findOne({email});
    if(emailAlreadyExist){
        throw new Error('Email already exist')
    }

    const usernameAlreadyExist = await User.findOne({username});
    if(usernameAlreadyExist){
        throw new Error('Username already exist')
    }

    if(password.length < 7){
        throw new Error('Password must be atleast 7 characters')
    }

    const isFirstAcc = await User.countDocuments({}) === 0;
    const role = isFirstAcc ? 'admin' : 'user'; 

    // const isSecondAcc = await User.countDocuments({}) === 1;
    // if(isSecondAcc){
    //     const role = ' moderator'
    // }

    const user = await User.create({email,username,password,role});
    console.log(user)
    const token = user.createJwt();
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });
    
    return res.render('testing')
});

// login 
const login = asyncWrapper(async(req,res) =>{
    res.render('user/login')
});

const mLogin = asyncWrapper(async(req,res) =>{
    const {email,password} = req.body;

    if(!email || !password){
        throw new Error('Please provide email and password')
    }

    const user = await User.findOne({email})
    if(!user){
        throw new Error('Not a registered user, please sign up')
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new Error('Invalid credentials')
    }
    console.log(user)
    const token = user.createJwt();
    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });

    return res.render('testing')
});

// change password
const cPassword = asyncWrapper(async(req,res) =>{
    res.render('user/changePassword')
    
});

const changePassword = asyncWrapper(async(req,res) =>{
    const {newPassword, password} = req.body;

    if(!newPassword || !password){
        throw new Error('Please provide the needed details')
    }

    console.log(req.user)

    // find user using the id
    const user = User.findById(req.params.id);
    // user.comparePassword(password);
    console.log(user)
    const isPasswordCorrect =  await user.comparePassword(password);
    if(!isPasswordCorrect){
        throw new Error('Please provide the correct password')
    }

    user.password = newPassword;
    await user.save();

    return res.send('Password changed successfully!')
});



// logout
const logout = asyncWrapper(async(req,res) =>{
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000),
    });

    res.render('user/login')
});

module.exports = {
    register,
    login,
    mRegister,
    mLogin,
    logout,
    changePassword,
    cPassword,
};