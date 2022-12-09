const { comparePass, hashPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Merchant, Menu, Category } = require("../models/index");
const sendEmail = require("../helpers/nodemailer");

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
        sendEmail(email);
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

  static async getListMerchant(req, res, next) {
    try {
      const listMerchant = await Merchant.findAll();

      res.status(200).json({ listMerchant });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async getMerchantMenu(req, res, next) {
    try {
      const { id } = req.params;
      const merchantId = id;

      const data = await Category.findAll({
        include: {
          model: Menu,
          where: {
            merchantId,
          },
        },
      });

      res.status(200).json({ CategoryMenu: data });
    } catch (err) {
      next(err);
      console.log(err);
    }
  }

  static async getMerchantByName(req, res, next) {
    try {
      const { name } = req.params;

      const foundMerchant = await Merchant.findOne({
        where: {
          name: name
            .split("-")
            .map((name) => name[0].toUpperCase() + name.substring(1))
            .join(" "),
        },
      });

      const merchantId = foundMerchant.id;
      const data = await Category.findAll({
        include: {
          model: Menu,
          where: {
            merchantId,
          },
        },
      });
      delete foundMerchant.dataValues.email;
      delete foundMerchant.dataValues.password;

      res.status(200).json({ Merchant: foundMerchant, Category: data });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = MerchantController;
