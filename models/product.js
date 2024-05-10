'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Order, {as: 'orders', through: {model: models.OrderItem}, foreignKey: 'product_id'})
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};