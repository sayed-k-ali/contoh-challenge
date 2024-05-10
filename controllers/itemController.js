const { Product } = require('../models')
module.exports = {
    adminCreateItem: async (req, res) => {
        const {name, price, image_url} = req.body;
        await Product.create({
            name, image_url, price
        })

        return res.json({
            message: "Product created"
        })
    },
    listItems: (req, res) => res.sendStatus(200),
    adminUpdateItem: (req, res) => res.sendStatus(200),
}