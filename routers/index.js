const router = require("express").Router();
const MerchantRouter = require("./merchantRouter");
const MenuRouter = require("./menuRouter");
const authentication = require("../middlewares/authentication");

router.use("/", MerchantRouter);
router.use(authentication);
router.use("/menus", MenuRouter);

module.exports = router;
