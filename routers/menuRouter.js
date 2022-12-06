const router = require("express").Router();
const MenuController = require("../controllers/menuController");

router.post("/", MenuController.createMenu);

module.exports = router;
