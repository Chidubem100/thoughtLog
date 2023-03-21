const jwt = require('jsonwebtoken');


const authenticateUser = async(req,res,next) =>{
    
    const token = req.signedCookies.token;
    if(!token){
        return res.redirect('/login');
        // throw new Error('Plese login')
    }

    try {
        const payload = jwt.verify(token, process.env.JwtSecrete);
        req.user = {userId: payload.userId, username: payload.username, role}
        next();
    } catch (error) {
        return res.redirect('/login')
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