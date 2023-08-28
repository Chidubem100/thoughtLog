const {verifyToken} = require('../utils/jwt');
const UnauthorizedError = require("../Errors/unauthorized-error");
const {BadRequestError} = require("../Errors")

const authenticateUser = (req,res,next) =>{
    // let token = req.signedCookies.token;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log(req.headers)
    // if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    let token = authHeader.split(' ')[1];

    try {

        const {username, userId, role} = verifyToken({token});
        req.user = {username,userId,role}
        console.log(token)
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