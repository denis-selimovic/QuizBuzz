const sendEmail = async (to, subject, text) => {
    const send = require('gmail-send')({
        user: process.env.QUIZ_BUZZ_MAIL,
        pass: process.env.QUIZ_BUZZ_PASS,
        to,
        subject,
        text
    });
    return await send();
};

module.exports = sendEmail;
