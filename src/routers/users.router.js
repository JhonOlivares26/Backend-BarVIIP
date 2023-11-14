const express = require("express")

const router = express.Router()

const { UsersController } = require('../controllers');
const _usersController = new UsersController()

router.post("/", _usersController.createUser)

module.exports = router