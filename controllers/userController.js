const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

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

const register = async (req, res) => {
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
    const user = await User.create({
        email,
        password: userPassword,
        fullname,
        is_admin
    });

    return res.json({
        message: "User registration successfully"
    })

}

module.exports = {
    login,
    register,
}