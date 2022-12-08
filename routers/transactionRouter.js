const TransactionController = require("../controllers/transactionController");
const router = require("express").Router();

router.post("/", TransactionController.addOrder);
router.post("/generate-midtrans-token", TransactionController.midtransToken);
router.post("/:id", TransactionController.addTransaction);

module.exports = router;
