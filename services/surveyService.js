const query = require("../query");

module.exports = {
  getResult: async (req, res) => {
    let queryData = await query.getSurveyResult(req.body.user_id);

    res.json(queryData);
  },

  UserAnswer: async (req, res) => {
    let queryData = await query.insertUserAnswer(req.body);
      if(queryData && queryData.correct_ans == queryData.answer_id){
        res.json({ message: "Your answer is correct" });
      }
      res.json({ message: "Your answer is incorrect" });

  },
};
