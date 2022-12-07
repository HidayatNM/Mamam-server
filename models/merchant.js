"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Merchant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Merchant.hasMany(models.Menu, { foreignKey: "merchantId" });
    }
  }
  Merchant.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email must be unique" },
        validate: {
          notEmpty: { msg: "Name is required" },
          notNull: { msg: "Name is required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Email must be unique" },
        validate: {
          notEmpty: { msg: "Name is required" },
          notNull: { msg: "Name is required" },
          isEmail: { args: true, msg: "Email must formated" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          notNull: { msg: "Password is required" },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Location is required" },
          notNull: { msg: "Location is required" },
        },
      },
      brandPict: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Brand Picture is required" },
          notNull: { msg: "Brand Picture is required" },
        },
      },
      openDay: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Open Day is required" },
          notNull: { msg: "Open Day is required" },
        },
      },
      openHour: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Open Hour is required" },
          notNull: { msg: "Open Hour is required" },
        },
      },
      closeHour: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Close Hour is required" },
          notNull: { msg: "Close Hour is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Merchant",
    }
  );
  return Merchant;
};
