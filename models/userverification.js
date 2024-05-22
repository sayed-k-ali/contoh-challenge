'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserVerification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.User, { as: 'user', foreignKey: 'id', sourceKey: 'id'})
    }
  }
  UserVerification.init({
    verification_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserVerification',
  });
  return UserVerification;
};