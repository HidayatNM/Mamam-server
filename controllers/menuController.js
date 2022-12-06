const { Menu } = require("../models/index");

class MenuController {
  static async createMenu(req, res, next) {
    try {
      const { name, description, price, imgUrl, categoryId } = req.body;
      const isAvail = "ready";
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
}

module.exports = MenuController;
