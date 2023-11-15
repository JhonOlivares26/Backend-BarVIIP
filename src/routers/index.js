const express = require("express");

const router = express.Router();

const userRouter = require('./users.router')
const barberRouter = require('./barbers.router')
const appointmentRouter = require('./appointments.router')

router.use( "/users", userRouter);
router.use("/barbers", barberRouter)
router.use("/appointments", appointmentRouter)
// Handler 404
router.use((req, res) => {
  return res.status(404).json({
    ok: false,
    message: "404 endpoint",
  });
});

module.exports = router;