const {verifyToken} = require('../utils/jwt');
const jwt = require('jsonwebtoken');
const UnauthorizedError = require("../Errors/unauthorized-error");
const {BadRequestError} = require("../Errors")


function VerifyAccessToken(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new UnauthorizedError("Authentication Failed!!")
    }

    const accessToken = authHeader.split(' ')[1];
    
    try {
       
        const payload = jwt.verify(accessToken, process.env.SECRETE);
        req.user = { userId: payload.userId, username: payload.username, role: payload.role }
        next();
       
    } catch (error) {
        console.log(error)
        res.status(401).json({success:false, msg: 'Unauthenticated!'})
    }
        
}

function authorizeUser(...roles) {
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError("Unauthorized or Forbidden");
        }
        next();
    };
};



module.exports = {
    authorizeUser,
    VerifyAccessToken
}