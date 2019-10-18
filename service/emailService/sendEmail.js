mailer = require('nodemailer');
const {SecretData} = require('../../config');

module.exports = async (email, messageData, subject) => {

    let transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: SecretData.EMAIL,
            pass: SecretData.PASSWORD
        }
    });

    await transporter.sendMail({
        from: SecretData.EMAIL,
        to: email,
        subject: subject,
        html: messageData
    })
};