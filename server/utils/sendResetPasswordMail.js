const sendEmail = require('./sendEmail');


const sendResetPasswordMail = ({username,email,origin,token }) =>{

    const resetURL = `${origin}/auth/reset-password?token=${token}&email=${email}`
    const msg = `<p>
                    Please reset password by clicking on the link <a href='${resetURL}'>Reset password</a>. 
                    <span>Please ignore if you didnt initiate this.</span> <em>Love from THOUGHT LOG</em>
                </p>`  

    return sendEmail({
        to: email,
        subject: `Reseet Password email`,
        html: `<div><spanv>Hello <strong>${username}</strong>,</span> ${msg}</div>`
    });
};

module.exports = {sendResetPasswordMail};