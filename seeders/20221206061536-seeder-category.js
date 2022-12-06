"use strict";

const dataCategory = require("../data/category.json");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const categories = dataCategory.map((el) => {
      el.updatedAt = new Date();
      el.createdAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Categories", categories, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
