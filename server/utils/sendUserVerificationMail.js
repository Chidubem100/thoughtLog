const sendEmail = require('./sendEmail');


const sendUserVerificationEmail = ({username,email}) =>{
    const msg = `<p>Hope you are having a great time being a member of the <strong>Thought Log</strong> community. 
                this mail is to informyou that your presence have been noticed and we hereby confer you with an honorary badge
                in order to show that we appreceiate you. We love you from <strong>Thought Log</strong>.
    </p>`

    return sendEmail({
        to: email,
        subject: `Verification email`,
        html: `Hello ${username}, ${msg}`
    });

};

module.exports = sendUserVerificationEmail;