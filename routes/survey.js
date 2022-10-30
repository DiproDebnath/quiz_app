const express = require("express")
const router = express.Router()

const surveyService = require('../services/surveyService')



router.post("/", surveyService.getResult)


router.post("/answer", surveyService.UserAnswer)




module.exports = router