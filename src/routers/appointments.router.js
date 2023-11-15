const express = require("express")

const router = express.Router()

const { AppointmentController } = require('../controllers');
const _appointmentController = new AppointmentController()

router.post("/", _appointmentController.createAppointment)

module.exports = router