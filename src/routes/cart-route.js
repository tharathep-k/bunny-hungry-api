const express = require("express");

const cartController = require("../controller/cart-controller");

const router = express.Router();

router.post("/addcart", cartController.addCart);
router.get("/getcart/:id", cartController.getCart);
router.delete("/deletecart/:id", cartController.deleteCart)

module.exports = router;
