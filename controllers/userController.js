const User = require('../models').sequelize.model('User')
const UserVerification = require('../models').sequelize.model('UserVerification')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { ValidationError } = require('sequelize');
const mailTransport = require('../libs/email');
const logger = require('../libs/logger');

const {JWT_SECRET_KEY} = process.env;

const salt = bcrypt.genSaltSync(10)

const login = async (req, res) => {
    const {email, password} = req.body;

    const isUserExist = await User.findOne({
        where: { email }
    })

    if (!isUserExist) {
        return res.status(401).json({
            message: "Login failed, username or password is incorrect"
        })
    }

    const passwordFromDB = isUserExist.password;

    const isValidPassword = bcrypt.compareSync(password, passwordFromDB)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Login failed, username or password is incorrect"
        })
    }

    const accessToken = jwt.sign({
        id: isUserExist.id,
        name: isUserExist.fullname,
        is_admin: isUserExist.is_admin
    }, JWT_SECRET_KEY, {
        expiresIn: '15m'
    })

    return res.json({ accessToken })
}

const register = async (req, res, next) => {
    const {email, password, is_admin, fullname} = req.body;

    const isEmailExist = await User.findOne({
        where: { email }
    })

    if (isEmailExist) {
        return res.status(400).json({
            message: "Email already registered into this application"
        })

    }

    const userPassword = bcrypt.hashSync(password, salt)
    try {
        const activationToken = Buffer.from(new Date().toISOString() + email).toString('base64')

        const user = await User.create({
            email,
            password: userPassword,
            fullname,
            is_admin
        });

        await UserVerification.create({
            id: user.id,
            verification_code: activationToken
        })

        // kirim email ke end user untuk aktivasi akun
        const emailParams = {
            from: 'no-reply@binaracademy.org',
            to: email, //tujuan pengiriman, ambil email dari user yang register
            subject: 'Email Confirmation for User Registration',
            text: 'please activate your account use this link: http://localhost:3000/api/v1/users/activate?token=' + activationToken
        }
        
        mailTransport.sendMail(emailParams)
            .then((success) => logger.info(success, "email sent to %s", email))
            .catch((fail) => logger.error(fail))

        return res.json({
            message: "User registration successfully",
            data: user
        })
        
    } catch (error) {
        if(error instanceof ValidationError) {
            next({
                status: 400,
                message: error.message
            })
            return
        }
        return res.sendStatus(500)
    }
    
}

const activateUser = async (req, res) => {
    const activationToken = req.query.token;

    const userToVerify = await UserVerification.findOne({
        where: {
            verification_code: activationToken,
        },
        include: ['user']
    })

    if (!userToVerify) {
        return res.status(401).send("user verification failed, please contact the customer care")
    }

    userToVerify.user.is_verified = true;
    await userToVerify.user.save();

    return res.json({
        message: "user berhasil di aktivasi"
    })
}

module.exports = {
    login,
    register,
    activateUser,
}