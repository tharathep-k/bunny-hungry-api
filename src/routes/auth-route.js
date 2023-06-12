const express = require("express")

const authController = require("../controller/auth-controller")
const authenticateMiddleware = require("../middlewares/authenticated")

const router = express.Router()

router.post("/register", authController.register)
router.post("/login" ,authController.login)
router.get("/me", authenticateMiddleware, authController.getMe)

module.exports = router