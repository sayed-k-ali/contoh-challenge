require('assert').strictEqual(process.env.NODE_ENV, 'test')
const app = require('../app')
const httpRequest = require('supertest')
const { sequelize } = require('../models')

const User = sequelize.model('User')

const { describe, it, expect } = require('@jest/globals')
const user = require('./helpers/user')

describe('User Registration test', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true})
    })

    it('should success register user', async () => {
        const res = await httpRequest(app)
            .post("/api/v1/users/register")
            .send({
                email: "sayed.ali@gmail.com",
                password: "testRandomPasswd007",
                is_admin: true,
                fullname: "Sayed Khaidir Ali"
            })
        
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual("User registration successfully")
    })

    it('should failed when the email is exist', async () => {
        //assume we have existing user

        const exampleUser = await user.createUser(true)

        const res = await httpRequest(app)
            .post("/api/v1/users/register")
            .send({
                email: exampleUser.email
            })

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toEqual("Email already registered into this application")
    })
})