'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Menu.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    isAvail: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    merchantId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};