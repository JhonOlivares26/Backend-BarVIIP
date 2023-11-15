const express = require("express")

const router = express.Router()

const { AppointmentController } = require('../controllers');
const _appointmentController = new AppointmentController()

router.post("/", _appointmentController.createAppointment)
router.delete("/:id",_appointmentController.deleteAppointment)
router.put("/:id",_appointmentController.updateAppinment)
router.get("/",_appointmentController.getByFilter)

module.exports = router