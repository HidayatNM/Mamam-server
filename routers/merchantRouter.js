const router = require("express").Router();
const merchantController = require("../controllers/merchantController");

router.post("/register", merchantController.register);

module.exports = router;
