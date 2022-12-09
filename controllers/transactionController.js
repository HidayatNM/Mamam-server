const {
  Transaction,
  Merchant,
  MenuTransaction,
  Menu,
} = require("../models/index");

const midtransClient = require("midtrans-client");

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
        merchantId: id,
        name,
        email,
        address,
        totalPay,
      });

      res.status(201).json({
        message: "Transaction successfully",
        email: dataTrax.email,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async midtransToken(req, res, next) {
    try {
      const { email, gross_amount } = req.body;
      console.log(email, gross_amount);

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        serverKey: "SB-Mid-server-koVIILNFoaXlrshKNe8179ED",
      });

      let parameter = {
        transaction_details: {
          order_id:
            "YOUR-ORDERID-" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      res.status(200).json(midtransToken);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = TransactionController;
