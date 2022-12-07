const {
  Transaction,
  Merchant,
  MenuTransaction,
  Menu,
} = require("../models/index");

class TransactionController {
  static async addOrder(req, res, next) {
    try {
      const { transactionId, menuId, quantity } = req.body;

      const foundMenu = await Menu.findOne({ id: menuId });
      if (!foundMenu) {
        throw { name: "Not found" };
      }

      let total = quantity * foundMenu.price;

      const order = await MenuTransaction.create({
        transactionId,
        menuId,
        quantity,
        total,
      });

      res.status(201).json({ message: "Order successfully" });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async addTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, address, totalPay } = req.body;

      const foundMerchant = await Merchant.findByPk(id);
      if (!foundMerchant) {
        throw { name: "Not found" };
      }

      const dataTrax = await Transaction.create({
        merchantId: foundMerchant.id,
        name,
        email,
        address,
        totalPay,
      });

      res.status(201).json({
        message: "Transaction successfully",
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = TransactionController;
