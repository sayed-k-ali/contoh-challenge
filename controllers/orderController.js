// const { Order, Product, OrderItem, sequelize } = require('../models')
const { sequelize } = require('../models')
const logger = require('../libs/logger')
const {Order, Product, OrderItem} = sequelize.models

module.exports = {
    createOrder: async (req, res, next) => {
        const {items, order} = req.body;


        const itemIds = items.map((item) => item.id)
        const itemDB = await Product.findAll({
            where: { id: itemIds },
            raw: true, //buat ngambil data tanpa format sequelize
            attributes: ['id', 'price'],
        })

        if (itemDB.length != items.length) {
            return res.sendStatus(400)
        }

        const mergedData = []
        itemDB.forEach((itemDB) => {
            mergedData.push({...itemDB,...(items.find(item => itemDB.id === item.id))})
        });

        const totalOrderPrice = mergedData.reduce((a, b) => a + b.price * b.quantiSequelizety, 0)

        const orderDB = await Order.create({
            user_id: 1,
            total_quantity: 0,
            total_price: totalOrderPrice,
        })

        logger.info(orderDB, "Order berhasil dibuat")

        const orderDetails = mergedData.map((product) => {
            return {
                order_id: orderDB.id,
                product_id: product.id,
                quantity: product.quantity,
            }
        })

        
        const orderItems = await OrderItem.bulkCreate(orderDetails)
        return res.json({orderItems})



    },
    getOrder: async (req, res) => {
        const orderId = req.params.order_id;
        const order = await Order.findByPk(orderId, {
            include: [
                {
                    model: Product,
                    as: 'items',
                    attributes: ['name', 'price']
                }
            ]
        })

        return res.json(order)
    }
}