const { sequelize } = require('../models')
const Product = sequelize.model('Product')

module.exports = {
    adminCreateItem: async (req, res, next) => {
        const {name, price, image_url} = req.body;

        try {
            const result = await sequelize.transaction(async t => {
                if (name == "") {
                    throw new Error("Product name should not be empty")
                }
                return Product.create({
                    name, image_url, price
                }, { transaction: t })
                
            })
            return res.json({
                message: "Product created",
                metadata: result
            })
            
        } catch (error) {
            next({
                status: 400,
                message: error.message
            })
        }
    },
    listItems: async (req, res) => {
        const items = await Product.findAll()
        return res.json({
            success: true,
            data: items
        })
    },
    adminUpdateItem: (req, res) => res.sendStatus(200),
    adminDeleteItem: async (req, res) => {
        await Product.destroy({
            where: {
                id: req.params.item_id
            },
        });
        return res.sendStatus(200)
    }
}