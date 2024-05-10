const controllers = require('../controllers');
const { isAdmin, isAuthenticated } = require('../middlewares');

const itemRouter = require('express').Router();

itemRouter.post('/admin/create', isAdmin, controllers.itemController.adminCreateItem)
itemRouter.get("/admin/list",  isAdmin, controllers.itemController.listItems)
itemRouter.patch("/admin/change-product",  isAdmin, controllers.itemController.adminUpdateItem)


module.exports = itemRouter