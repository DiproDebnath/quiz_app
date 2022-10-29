const db = require("../connection");
const query = require("../query");



module.exports = {
  // get all question with answer
  getQuestion: async (req, res) => {
    let data = await query.selectQuestion();
    res.json(data);
  },
  getQuestionById: async (req, res) => {
    let [data] = await query.selectQuestion(req.params.id);
    if(data){
        res.json(data);
    }else{
        res.json({message: "no record found"});
    }
   
  },
  // create question
  addQuestion: async (req, res) => {
    await query.insertQuestion(req.body.question);
    res.json({ message: "question created successfully" });
  },


  // create question
  addQuestionWithAnswer: async (req, res) => {
    await query.insertQuestionWithAns(req.body.question, req.body.answers )
    res.json({ message: "question and answers created successfully" });
  },
};
