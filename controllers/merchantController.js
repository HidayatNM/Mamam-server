const { Merchant } = require("../models/index");

class MerchantController {
  static async register(req, res, next) {
    try {
      const {
        name,
        email,
        password,
        location,
        brandPict,
        openDay,
        openHour,
        closeHour,
      } = req.body;
      const createMerchant = await Merchant.create({
        name,
        email,
        password,
        location,
        brandPict,
        openDay,
        openHour,
        closeHour,
      });
      if (createMerchant) {
        res.status(201).json({
          message: `Merchant with name ${createMerchant.name} has been created`,
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MerchantController;
