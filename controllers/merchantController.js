const { comparePass, hashPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
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
        password: hashPassword(password),
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
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "Bed request" };
      }

      const foundMerchant = await Merchant.findOne({ where: { email } });
      if (!foundMerchant) {
        throw { name: "Invalid credentials" };
      }

      const compare = comparePass(password, foundMerchant.password);
      if (!compare) {
        throw { name: "Invalid credentials" };
      }

      let payload = { id: foundMerchant.id };

      const access_token = createToken(payload);

      res.status(200).json({ access_token, foundMerchant });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MerchantController;
