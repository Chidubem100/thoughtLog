const BadRequestError = require('../../Errors');
const {StatusCodes} = require('http-status-codes')
const User = require('./auth');



const register = async(req,res) =>{
    console.log(req.body);
}



const login = async(req,res) =>{
    console.log(req.body);
}


module.exports = {
    register,
    login,
}
