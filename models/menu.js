"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.belongsTo(models.Category, { foreignKey: "categoryId" });
      Menu.belongsTo(models.Merchant, { foreignKey: "merchantId" });
    }
  }
  Menu.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      isAvail: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
      merchantId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Merchants",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Menu",
    }
  );
  return Menu;
};
