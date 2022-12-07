const TransactionController = require("../controllers/transactionController");
const router = require("express").Router();

router.post("/", TransactionController.addOrder);
router.post("/:id", TransactionController.addTransaction);

module.exports = router;
