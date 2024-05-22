const controllers = require('../controllers');
const { isAuthenticated } = require('../middlewares');

const userRouter = require('express').Router();

userRouter.post("/login", controllers.userController.login)
userRouter.post("/register", controllers.userController.register)
userRouter.get("/my-profile", isAuthenticated, (req, res) => res.sendStatus(200))
userRouter.get("/activate", controllers.userController.activateUser)

module.exports = userRouter