
const asyncWrapper = require('../middlewares/asyncWrapper');




const register = asyncWrapper(async(req,res) =>{
    res.render('user/signUp');
});

const mRegister = asyncWrapper(async(req,res) =>{
    res.send('mmmm')
});

const login = asyncWrapper(async(req,res) =>{
    res.render('user/login')
});

const mLogin = asyncWrapper(async(req,res) =>{
    res.send('mmm')
});



module.exports = {
    register,
    login,
    mRegister,
    mLogin
};