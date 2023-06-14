const express = require("express");

const productController = require("../controller/product-controller");
const authenticatedStaff = require("../middlewares/authenticated-staff");
const upload = require("../middlewares/upload")

const router = express.Router();

// router.post("/", authenticatedStaff, productController.createMenu)
router.put("/:menuid", productController.updateMenu)
router.delete("/:menuid", productController.deleteMenu)
router.get("/menus", productController.getMenu)
router.post("/", authenticatedStaff, upload.single("menuImage") ,productController.createMenu)

module.exports = router;
