const express = require("express")
const { AuthMiddleware } = require("../middleware/auth.middleware");

const router = express.Router()

const { BarbersController } = require('../controllers');
const _barberController = new BarbersController()

router.post("/", _barberController.createBarber)

router.use(AuthMiddleware)

router.delete("/:id", _barberController.deleteBarber)
router.put("/:id", _barberController.updateBarber)
router.get("/:id", _barberController.getBarber)


module.exports = router

