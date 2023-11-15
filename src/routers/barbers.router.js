const express = require("express")

const router = express.Router()

const { BarberController } = require('../controllers');
const _barberController = new BarberController()

router.post("/", _barberController.createBarber)

module.exports = router