const orderController = require('../controllers/orderController');

const orderRouter = require('express').Router();

orderRouter.post("/create", orderController.createOrder)
orderRouter.get("/:order_id", orderController.getOrder)

module.exports = orderRouter