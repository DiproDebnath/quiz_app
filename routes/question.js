const express = require("express")
const router = express.Router()

const questionService = require('../services/questionService')



router.get("/", questionService.getQuestion)
router.get("/:id", questionService.getQuestionById)


router.post("/create", questionService.addQuestion)
router.post("/create_with_answer", questionService.addQuestionWithAnswer)




module.exports = router