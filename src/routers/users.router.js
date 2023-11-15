const express = require("express")

const router = express.Router()

const { UsersController } = require('../controllers');
const _usersController = new UsersController()

router.post("/", _usersController.createUser)
router.delete("/:id", _usersController.deleteUser)
router.put("/:id", _usersController.updateUser)
router.get("/:id", _usersController.getUser)


module.exports = router