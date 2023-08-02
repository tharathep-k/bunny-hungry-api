const express = require("express");

const orderController = require("../controller/order-controller");

const router = express.Router();

router.post("/createorder", orderController.createOrder);
router.get("/getallorder", orderController.getAllOrder);
router.put("/updatestatusorder/:id", orderController.updateStatusOrder)
router.get("/getorder/:id", orderController.getOrder);
router.get("/getinfoorder/:id", orderController.getOrder);

module.exports = router;
