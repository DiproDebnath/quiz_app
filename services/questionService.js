const questionQuery = require('../query/question')
const insertQuestion = questionQuery.insertQuestion
const selectQuestion = questionQuery.selectQuestion


module.exports = {
// get all question with answer
    getQuestion : async (req, res) => {
        res.json(selectQuestion())
    },
    addQuestion:  async (req, res) => {
        await insertQuestion(req.body.question)
        res.json(req.body.question)
    }
}