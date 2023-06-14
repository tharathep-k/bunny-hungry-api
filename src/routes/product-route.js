const express = require("express");

const productController = require("../controller/product-controller");
const authenticatedStaff = require("../middlewares/authenticated-staff");

const router = express.Router();

router.post("/", authenticatedStaff, productController.createMenu)
router.put("/:menuid", productController.updateMenu)
router.delete("/:menuid", productController.deleteMenu)
router.get("/menus", productController.getMenu)

module.exports = router;
