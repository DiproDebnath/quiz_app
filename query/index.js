const db = require("../connection");

module.exports = {
  // get question(s) with answers
  selectQuestion: async (id = null) => {
   
    try {
      let queryString = `SELECT q.question_id, q.question, JSON_ARRAYAGG(JSON_OBJECT("answer_id", a.answer_id, "answer", a.answer )) AS answers FROM questions q JOIN answers a ON a.question_id = q.question_id`;
      if (id) {
        queryString += ` WHERE q.question_id = ${id} `;
      }
      queryString += ` GROUP BY q.question_id`;

      let [rows] = await db.query(queryString);
      return rows;

    } catch (err) {
      console.log(err);
    }
  },
  // insert question
  insertQuestion: async (question) => {
    try {
      let [data] = await db.execute(
        `INSERT INTO questions(question) VALUES('${question}')`
      );
      return data.insertId;
    } catch (err) {
      console.log(err);
    }
  },
  // insert question with answers
  insertQuestionWithAns: async (question, answers) => {
    try {
      await db.query(`START TRANSACTION`);
      let [questionData] = await db.query(  `INSERT INTO questions(question) VALUES ('${question}') `);
      await db.query(
        `INSERT INTO answers(answer, is_right_ans, question_id ) VALUES ?`,
        [
          answers.map((item) => [
            item.answer,
            item.is_correct,
            questionData.insertId
          ]),
        ]
      );
      await db.query(`COMMIT`);
    } catch (err) {
      console.log(err);
    }
  },
  // get user(s)
  selectUser: async (id= null) => {
    try {
      let queryString = `SELECT * FROM users`;
      if (id) {
        queryString += ` WHERE user_id = ${id} `;
      }
      let [rows] = await db.query(queryString);
      return rows;
    } catch (err) {
      console.log(err);
    }
  },
  // insert User
  insertUser: async (username) => {
    try {
      let [data] = await db.execute(
        `INSERT INTO user(username) VALUES('${username}')`
      );
      return data.insertId;
    } catch (err) {
      console.log(err);
    }
  },
};
