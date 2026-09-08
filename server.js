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
  user: "u_4h3KZj",       
  password: "MBrSwLP9k0lB",       
  database: "freedb_dmTNwsTh",
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
});

app.get("/api/profiles", (req, res) => {
  pool.query("SELECT * FROM profiles", (err, rows, fields) => {
    if (err) throw err;
    res.json(rows);
  });
});

//UPDATE
app.put("/api/profiles", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const role = req.body.role;
  const id = req.body.id;

  pool.query(
    "UPDATE profiles SET name = ?, email = ?, role = ? WHERE id = ?",
    [name, email, role, id],
    (err, rows, fields) => {
      if (err) throw err;
      res.json({ msg: "Successfully updated" });
    },
  );
});

//DELETE
app.delete("/api/profiles", (req, res) => {
  const id = req.body.id;
  pool.query("DELETE FROM profiles WHERE id = ?", [id], (err, rows, fields) => {
    if (err) throw err;
    res.json({ msg: "Successfully deleted" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});