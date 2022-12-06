const router = require("express").Router();
const MenuController = require("../controllers/menuController");

router.post("/", MenuController.createMenu);
router.get("/", MenuController.getMenu);
router.get("/:id", MenuController.getMenuId);
router.put("/:id", MenuController.editMenu);
router.delete("/:id", MenuController.deleteMenu);
router.patch("/:id", MenuController.changeStatus);

module.exports = router;
