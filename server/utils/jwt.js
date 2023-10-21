const jwt = require('jsonwebtoken');



const createToken = ({payload}) =>{
    const accessToken = jwt.sign(
        payload,
        process.env.SECRETE,
        {
            expiresIn: '30d'
        }
    )
    return accessToken
}

const verifyToken = ({accessToken}) =>{
   const x= jwt.verify(accessToken, process.env.SECRETE)
   return x;
}


const attachCookiesToResponse = ({res,user}) =>{
    const accessToken = createToken({payload:user});

    const oneDay = 1000*60*60*60;

    res.cookie('accessToken', accessToken,
    {
        httpOnly:true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        sameSite: "none",
        signed: true   
    });
}


module.exports = {
    createToken,
    verifyToken,
    attachCookiesToResponse
}