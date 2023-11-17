const express = require("express")
const { AuthMiddleware } = require("../middleware/auth.middleware");

const router = express.Router()

const { BarbersController } = require('../controllers');
const _barberController = new BarbersController()

router.post("/", _barberController.createBarber)
//Save image
router.post("/:id/image",_barberController.saveImage);

router.use(AuthMiddleware)

router.delete("/:id", _barberController.deleteBarber)
router.put("/:id", _barberController.updateBarber)
router.get("/:id", _barberController.getBarber)
router.get("/", _barberController.allBarbers)


module.exports = router

