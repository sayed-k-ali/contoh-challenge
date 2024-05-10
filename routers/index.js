const { isAuthenticated } = require('../middlewares');
const itemRouter = require('./itemRouter');
const orderRouter = require('./orderRouter');
const userRouter = require('./userRouter');

const routers = require('express').Router();

routers.use("/users", userRouter)

routers.use("/items", isAuthenticated, itemRouter)

routers.use("/orders", orderRouter)
module.exports = routers