const jwt = require('jsonwebtoken');


const authenticateUser = async(req,res,next) =>{
    
    const token = req.signedCookies.token;
    if(!token){
        throw new Error('Plese login')
    }

    try {
        const payload = jwt.verify(token, 'secrete');
        req.user = {userId: payload.userId, username: payload.username, role: payload.role}
        next();
    } catch (error) {
        // console.log(error)
        throw new Error('Authentication failed')
    };
};


const authorizeUser = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            throw new Error('Unauthorized to access this route')
        }
        next();
    };
};

module.exports = {
    authenticateUser,
    authorizeUser,
}