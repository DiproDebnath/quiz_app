const express = require("express")
const router = express.Router()

const questionService = require('../services/questionService')
const getQuestion = questionService.getQuestion
const addQuestion = questionService.addQuestion

// get all question with answer
router.get("/", getQuestion)

// create a question
router.post("/create", addQuestion)





module.exports = router