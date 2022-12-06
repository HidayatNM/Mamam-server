const router = require("express").Router();
const merchantController = require("../controllers/merchantController");

router.post("/register", merchantController.register);
router.post("/login", merchantController.login);

module.exports = router;
