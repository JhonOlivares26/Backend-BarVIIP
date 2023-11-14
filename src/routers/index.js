const express = require("express");

const router = express.Router();

const userRouter = require('./users.router')

router.use( "/users", userRouter);

// Handler 404
router.use((req, res) => {
  return res.status(404).json({
    ok: false,
    message: "404 endpoint",
  });
});

module.exports = router;