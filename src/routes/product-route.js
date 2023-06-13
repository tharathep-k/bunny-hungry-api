const express = require("express");

const productController = require("../controller/product-controller")

const router = express.Router();

router.post("/", productController.createMenu)
router.put("/:menuid", productController.updateMenu)

module.exports = router;
