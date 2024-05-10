require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models').sequelize.model('User')
const userController = require('./userController')

const { expect, describe, it } = require('@jest/globals')

jest.mock('jsonwebtoken')

jest.mock('bcrypt')
bcrypt.genSaltSync.mockReturnValue('some-generated-salt')

const mockUser = {
  findOne: (User.findOne = jest.fn())
}

const mockRequest = (body = {}, params = {}, query = {}) => {
  return {
    body,
    params,
    query
  }
}

const mockResponse = () => {
  const res = {}

  res.json = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);

  return res;
}

describe('UserController unit test', () => {
  describe('UserController Login', () => {
    it('should successfully logged in for a valid user', async () => {

      const passwordFromDB = "HashedPasswordFromTheGivenUser"

      const req = mockRequest({
        email: "sayed.ali@gmail.com",
        password: "SomeRandomPassword007"
      })
      const res = mockResponse();

      mockUser.findOne.mockResolvedValue({
        id: 1,
        email: req.body.email,
        password: passwordFromDB,
        is_admin: true,
        fullname: 'some user'
      })

      bcrypt.compareSync.mockReturnValue(true)


      jwt.sign.mockReturnValue('some-token')

      await userController.login(req, res)

      expect(res.json).toBeCalledWith({ accessToken: 'some-token'})
      expect(bcrypt.compareSync).toBeCalledWith(req.body.password, passwordFromDB)
      expect(mockUser.findOne).toBeCalledWith({where: {email: req.body.email}})
      expect(jwt.sign).toBeCalledWith({
        id: 1,
        name: 'some user',
        is_admin: true,
      }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15m'
      })


    });

    it('should failed when user is not exist', async () => {
      const req = mockRequest({
        email: "sayed.ali@gmail.com",
        password: "SomeRandomPassword007"
      })
      const res = mockResponse();

      mockUser.findOne.mockResolvedValue(null)


      await userController.login(req, res)

      expect(res.status).toBeCalledWith(401)
      
    });

    it('should failed when password is invalid', async () => {
      const req = mockRequest({
        email: "sayed.ali@gmail.com",
        password: "InvalidPasswordTest"
      })
      const res = mockResponse();

      const hashedPasswd = 'SomeCorrectPasswordHashed';
      mockUser.findOne.mockResolvedValue({
        email: req.body.email,
        password: hashedPasswd,
      })

      bcrypt.compareSync.mockReturnValue(false)

      await userController.login(req, res)

      expect(res.status).toBeCalledWith(401)
      expect(bcrypt.compareSync).toBeCalledWith(req.body.password, hashedPasswd)
      
    });
  })
})
