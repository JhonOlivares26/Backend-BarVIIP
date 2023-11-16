const express = require("express");

const router = express.Router();

const userRouter = require('./users.router')
const barberRouter = require('./barbers.router')
const appointmentRouter = require('./appointments.router')
const {AuthController}= require("../controllers/auth.controller");
const { AuthMiddleware } = require("../middleware/auth.middleware");
const _authController= new AuthController();

router.use("/static/", express.static("images"));

router.use((req, res, next) => {
  console.log("Middleware - Audiencia");
  next();
});

router.post("/auth", _authController.login)
/* router.use(AuthMiddleware) */
router.use( "/users", userRouter);
router.use("/barbers", barberRouter)
router.use("/appointments", appointmentRouter)

router.post("/verify", _authController.verifyToken)
// Handler 404
router.use((req, res) => {
  return res.status(404).json({
    ok: false,
    message: "404 endpoint",
  });
});

module.exports = router;