const express = require("express")
const usersController = require("../app/controles/usersController")
const router = express.Router()

router.post("/users/register", usersController.register)

router.post("/users/login" , usersController.login)

module.exports= router