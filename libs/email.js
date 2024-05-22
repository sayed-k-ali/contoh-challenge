require('dotenv').config()
const nodemailer = require('nodemailer')

const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_SMTP_USER,
        pass: process.env.GOOGLE_SMTP_PASSWORD
    }
    
})

module.exports = mailTransport