const { Menu, Category, Merchant } = require("../models/index");

class MenuController {
  static async createMenu(req, res, next) {
    try {
      const { name, description, price, imgUrl, categoryId } = req.body;
      const isAvail = "available";
      const merchantId = req.user.id;

      await Menu.create({
        name,
        description,
        price,
        isAvail,
        imgUrl,
        categoryId,
        merchantId,
      });

      res.status(200).json({
        message: "Menu created successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getMenu(req, res, next) {
    try {
      const { id } = req.user;
      const menus = await Menu.findAll({ where: { merchantId: id } });

      res.status(200).json({ menus });
    } catch (err) {
      next(err);
    }
  }

  static async getMenuId(req, res, next) {
    try {
      const { id } = req.params;
      const menu = await Menu.findOne({
        include: [Category, Merchant],
        where: { id },
      });

      if (!menu) {
        throw { name: "Not found" };
      }

      res.status(200).json({ menu });
    } catch (err) {
      next(err);
    }
  }

  static async editMenu(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, imgUrl } = req.body;

      const checkMenu = await Menu.findByPk(id);

      const menu = await Menu.update(
        {
          name,
          description,
          price,
          imgUrl,
        },
        {
          where: { id },
        }
      );

      if (menu === 0) {
        throw { name: "Not found" };
      }

      res.status(200).json({
        message: `Product ${checkMenu.name} edited successfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteMenu(req, res, next) {
    try {
      const { id } = req.params;

      const foundMenu = await Menu.findByPk(id);
      const menu = await Menu.destroy({ where: { id } });
      if (menu === 0) {
        throw { name: "Not found" };
      }

      res.status(200).json({
        message: `Merchant ${foundMenu.name} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async changeStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { isAvail } = req.body;

      const foundMenu = await Menu.findByPk(id);
      if (!foundMenu) {
        throw { name: "Not found" };
      }

      await Menu.update({ isAvail }, { where: { id } });

      res.status(200).json({
        message: `${foundMenu.name} is ${isAvail}`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MenuController;
