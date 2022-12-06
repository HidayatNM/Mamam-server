const router = require("express").Router();
const merchantRouter = require("./merchantRouter");

router.use("/", merchantRouter);
// router.use("/menus");
// router.use("/categories");

module.exports = router;
