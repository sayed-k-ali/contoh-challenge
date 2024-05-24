require('assert').strictEqual(process.env.NODE_ENV, 'test')
const app = require('../app')
const httpRequest = require('supertest')
const { sequelize } = require('../models')

const { describe, it, expect } = require('@jest/globals')

const user = require('./helpers/user')

describe('User Login test', () => {
    beforeAll(async () => {
        await sequelize.sync({force: true})
    });

    
    it('should success login user', async () => {
        try {
            const sampleUser = await user.createUser({ is_admin: false })
            const res = await httpRequest(app)
                .post("/api/v1/users/login")
                .send({
                    email: sampleUser.email,
                    password: sampleUser.password
                })
            
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('accessToken')
            
        } catch (error) {
            console.log(error)
        }
    })

    
})