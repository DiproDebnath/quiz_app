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
      let [questionData] = await db.query(
        `INSERT INTO questions(question) VALUES ('${question}') `
      );
      await db.query(
        `INSERT INTO answers(answer, is_right_ans, question_id ) VALUES ?`,
        [
          answers.map((item) => [
            item.answer,
            item.is_correct,
            questionData.insertId,
          ]),
        ]
      );
      await db.query(`COMMIT`);
    } catch (err) {
      console.log(err);
    }
  },
  // get user(s)
  selectUser: async (id = null) => {
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
        `INSERT INTO users(username) VALUES('${username}')`
      );
      return data.insertId;
    } catch (err) {
      console.log(err);
    }
  },

  // get answer from user
  insertUserAnswer: async (answer_data) => {
    try {
      let [data] = await db.query(
        `INSERT INTO user_question_answers(user_id, question_id, answer_id) VALUES ( ? ) `,
        [[answer_data.user_id, answer_data.question_id, answer_data.answer_id]]
      );
      let statement = `SELECT a.is_right_ans AS correct_ans, uqa.answer_id  FROM user_question_answers uqa  `;
      statement += ` JOIN questions q USING(question_id) `;
      statement += ` JOIN answers a USING(question_id) `;
      statement += ` WHERE a.is_right_ans = 1 AND uqa.id = ${data.insertId}`;
      let [rows] = await db.query(statement);
      return rows[0];
    } catch (err) {
      console.log(err.sqlMessage);
    }
  },
  getSurveyResult: async (user) => {
    let result = {};
    try {

      //get question and answer list for single user
      let statement = `SELECT q.question_id, q.question, a.answer AS correct_answer, (SELECT answer FROM answers WHERE answer_id =uqa.answer_id ) AS given_answer FROM user_question_answers uqa `;
      statement += ` JOIN questions q USING(question_id) `;
      statement += ` JOIN answers a USING(question_id) `;
      statement += ` WHERE a.is_right_ans = 1 AND uqa.user_id = ${user}`;
      let [answers] = await db.query(statement);

      // get total answer and point for single user
      statement = `SELECT COUNT(uqa.id) AS total, SUM(a.is_right_ans) AS point  FROM user_question_answers uqa`;
      statement += ` JOIN answers a USING (answer_id)`;
      statement += ` WHERE uqa.user_id = ${user}`;

      let [getPoint] = await db.query(statement);

      const { total, point } = getPoint[0];
      result = { answers, total, point };
      
       return result;
    } catch (err) {
      console.log(err.sqlMessage);
    }
  },
};
