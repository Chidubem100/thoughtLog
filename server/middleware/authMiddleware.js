const {verifyToken} = require('../utils/jwt');


const authenticateUser = (req,rs,next) =>{
    const token = req.signedCookies.token;

    try {
        const {username, userId, role} = verifyToken({token});
        req.user = {username,userId,role}

        next();
    } catch (error) {
        throw new Error("Unauthenticated. cant access this route")
        // console.log(error)
    }
}



module.exports = {
    authenticateUser,
}