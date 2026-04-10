const nodeMailer = require("nodemailer");

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

const sendEmail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `inventory System: <${process.env.EMAIL_USER}>`,
        to: to,
        subject: subject,
        html: html
    })
}

module.exports = sendEmail;