const router = require("express").Router();
const MerchantRouter = require("./merchantRouter");
const MenuRouter = require("./menuRouter");
const TransactionRouter = require("./transactionRouter");
const authentication = require("../middlewares/authentication");

router.use("/", MerchantRouter);
router.use("/transactions", TransactionRouter);
router.use(authentication);
router.use("/menus", MenuRouter);

module.exports = router;
