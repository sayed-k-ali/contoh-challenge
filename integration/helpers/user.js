const User = require('../../models').sequelize.model('User')
const { faker } = require('@faker-js/faker')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = {
    createUser: async ({ is_admin = false}) => {
        const actualPassword = faker.internet.password();
        const hashedPassword = bcrypt.hashSync(actualPassword, 10)
        const userData = {
            is_admin,
            is_verified: false,
            email: faker.internet.email(),
            fullname: faker.internet.displayName(),
            password: actualPassword
        }
        try {
            const userDb = await User.create({
                ...userData,
                password: hashedPassword,
            })
            Object.assign(userData, {id: userDb.id})
            
        } catch (error) {
            console.log(error)
        }
        return userData;
    },
}