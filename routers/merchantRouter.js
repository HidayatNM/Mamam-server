const router = require("express").Router();
const merchantController = require("../controllers/merchantController");

router.post("/register", merchantController.register);
router.post("/login", merchantController.login);
router.get("/merchants/:name", merchantController.getMerchantByName);

module.exports = router;
