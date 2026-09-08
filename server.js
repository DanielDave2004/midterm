const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const pool = mysql.createPool({
  host: "sql.freedb.tech",
  user: "u_O28gLS",
  password: "JPC7I6DDHGRZ",
  database: "freedb_s8EqDl6I",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

//GET
app.get("/api/students", (req, res) => {
  pool.query("SELECT * FROM students_info", (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
});

//CREATE
app.post("/api/students", (req, res) => {
  const fullname = req.body.fullname;
  const course = req.body.course;
  const year_level= req.body.year_level
  const email_address = req.body.email_address;
  const contact_number = req.body.contact_number;
  pool.query(
    "INSERT INTO students_info (fullname, course, year_level, email_address, contact_number) VALUES (?, ?, ?, ?, ?)",
    [fullname, course, year_level, email_address, contact_number],
    (err, rows, fields) => {
      if (err) throw err;
      res.json({ msg: `Successfully inserted!` });
    },
  );
});

//SEARCH
app.get("/api/students/:student_id", (req, res) => {
  const student_id = req.params.student_id;
  pool.query(
    "SELECT * FROM students_info WHERE id = ?", [student_id], (err, rows, fields) => {
      if (err) throw err;
      if (rows.length > 0) {
        res.json(rows);
      } 
      else {
        res.status(400).json({ msg: `${id} Student ID not found!` });
      }
    },
  );
});

//UPDATE
app.put("/api/students", (req, res) => {
  const fullname = req.body.fullname;
  const course = req.body.course;
  const year_level= req.body.year_level
  const email_address = req.body.email_address;
  const contact_number = req.body.contact_number;
  const student_id = req.body.student_id;

  pool.query(
    "UPDATE students_info SET fullname = ?, course = ?, year_level = ?, email_address = ?, contact_number = ? WHERE student_id = ?",
    [fullname, course, year_level, email_address, contact_number, student_id],
    (err, rows, fields) => {
      if (err) throw err;
      res.json({ msg: `Successfully updated` });
    },
  );
});

//DELETE
app.delete("/api/students", (req, res) => {
  const student_id = req.body.student_id;
  pool.query("DELETE FROM students_info WHERE student_id = ?", [student_id], (err, rows, fields) => {
    if (err) throw err;
    res.json({ msg: `Successfully deleted` });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
