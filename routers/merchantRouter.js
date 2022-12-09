const router = require("express").Router();
const merchantController = require("../controllers/merchantController");

router.post("/register", merchantController.register);
router.post("/login", merchantController.login);
router.get("/", merchantController.getListMerchant);
router.get("/:id", merchantController.getMerchantMenu);
router.get("/:name", merchantController.getMerchantByName);

module.exports = router;
