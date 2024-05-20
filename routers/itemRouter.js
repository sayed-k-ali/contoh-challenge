const controllers = require('../controllers');
const { isAdmin, isAuthenticated } = require('../middlewares');

const itemRouter = require('express').Router();

itemRouter.post('/admin/create', isAdmin, controllers.itemController.adminCreateItem)
itemRouter.get("/list", controllers.itemController.listItems)
itemRouter.patch("/admin/change-product",  isAdmin, controllers.itemController.adminUpdateItem)
itemRouter.delete("/admin/:item_id", isAdmin, controllers.itemController.adminDeleteItem)


module.exports = itemRouter