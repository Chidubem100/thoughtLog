const nodemailerConfig = require('./nodemailerConfig');
const nodemailer = require('nodemailer');


const sendEmail =  ({to,subject,html}) =>{
    const transporter =  nodemailer.createTransport(nodemailerConfig);
    return transporter.sendMail({
        from : 'Thought Log <ThoughtLog@gmail.com>',
        to,
        subject,
        html,
    });
};

module.exports = sendEmail;
