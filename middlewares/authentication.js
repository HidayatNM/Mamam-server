const { verifyToken } = require("../helpers/jwt");
const { Merchant } = require("../models/");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Unauthorized" };
    }

    const payload = verifyToken(access_token);
    const foundMerchant = await Merchant.findByPk(payload.id);
    if (!foundMerchant) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: foundMerchant.id,
      email: foundMerchant.email,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
