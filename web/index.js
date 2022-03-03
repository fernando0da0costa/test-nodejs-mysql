const express = require("express");
const mysql = require("mysql");
const app = express();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "password",
  database: process.env.MYSQL_DATABASE || "test",
});

app.get("/", (req, res) => {
  connection.query("SELECT * FROM Student", (err, rows) => {
    if (err) {
      res.json({
        success: false,
        err,
      });
    } else {
      res.json({
        success: true,
        rows,
      });
    }
  });
});

app.get("/insert", (req, res) => {

    let q= `INSERT INTO Student(
        student_name, 
        student_age) 
 VALUES(
        "${(Math.random() + 1).toString(36).substring(7)}", 
         23
 );`
    connection.query(q, (err, rows) => {
      if (err) {
        res.json({
          success: false,
          err,
        });
      } else {
        res.json({
          success: true,
          rows,
        });
      }
    });
  });
  

app.listen(5000, () => console.log("listining on port 5000"));