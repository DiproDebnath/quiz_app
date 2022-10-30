const express = require("express")
const router = express.Router()

const userService = require('../services/userService')



router.get("/", userService.getUsers)
router.get("/:id", userService.getUserById)


router.post("/create", userService.addUser)




module.exports = router