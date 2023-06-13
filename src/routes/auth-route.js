const express = require("express")

const authController = require("../controller/auth-controller")
const authenticateMiddleware = require("../middlewares/authenticated")
const authenticateMiddlewareStaff = require("../middlewares/authenticated-staff")

const router = express.Router()

router.post("/register", authController.register)
router.post("/login" ,authController.login)
router.get("/me/user", authenticateMiddleware, authController.getMe)
router.get("/me/staff", authenticateMiddlewareStaff, authController.getMeStaff)

module.exports = router