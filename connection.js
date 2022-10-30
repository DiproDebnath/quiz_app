const mysql = require("mysql2");

// create the connection to database

const conectionPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "survey",
  multipleStatements: true,
});

const msqlConection = conectionPool.promise();

module.exports = msqlConection;
