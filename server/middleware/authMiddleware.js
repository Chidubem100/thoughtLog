const {verifyToken} = require('../utils/jwt');
const UnauthorizedError = require("../Errors/unauthorized-error");
const {BadRequestError} = require("../Errors")

const authenticateUser = (req,rs,next) =>{
    const token = req.signedCookies.token;

    try {
        const {username, userId, role} = verifyToken({token});
        req.user = {username,userId,role}

        next();
    } catch (error) {
        throw new BadRequestError("Unauthenticated. Can't access the route")
        // throw new Error("Unauthenticated. cant access this route")
        // console.log(error)
    }
};

function authorizeUser(...roles) {
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError("Unauthorized or Forbidden");
        }
        next();
    };
};



module.exports = {
    authenticateUser,
    authorizeUser,
}