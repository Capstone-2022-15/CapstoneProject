const fs = require("fs");
// const cors = require("cors");
// app.use(cors());

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql2/promise");

const getConnection = async () => {
  let connection = await mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database,
  });
  return connection;
};

/* -----학사정보 전체 GET----- */
exports.show = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql = "SELECT * FROM degree WHERE isDeleted = 0 AND config_idx = 2"; // 설정
    let [rows, fields] = await connection.query(sql);
    if (rows[0]) {
      res.status(200).json({ status: "200", data: rows });
    } else {
      res.status(200).json({ status: "200", data: rows });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----학사정보 POST----- */
exports.create = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql = "INSERT INTO degree VALUES (null,?,?,?,?,?,now(),now(),0,?,0,0)";
    let config_idx = 2; // 설정
    let subject = req.body.subject;
    let content = req.body.content;
    let writer = req.body.writer;
    let writer_nick = req.body.writer_nick;
    let password = req.body.password;
    let params = [config_idx, subject, content, writer, writer_nick, password];
    let [rows, field] = await connection.query(sql, params);
    if (rows.affectedRows == 1) {
      res.status(204).json();
    } else if (rows.affectedRows > 1) {
      res
        .status(409)
        .json({ status: "409", message: "Posted more than expect" });
    } else {
      res.status(400).json({ status: "400", message: "Post fail" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----학사정보 DELETE----- */
exports.delete = async (req, res) => {
  try {
    const connection = await getConnection();
    // console.log(req.params.id);
    let sql = "UPDATE degree SET isDeleted = 1 WHERE idx = ?";
    let params = [req.params.id];
    let [rows, field] = await connection.query(sql, params);
    if (rows.changedRows > 0) {
      res.status(204).send();
    } else {
      res.status(400).json({ status: "400", message: "Not matched id" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----학사정보 UPDATE(POST w/ id)----- */
exports.update = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "UPDATE degree SET subject = ?, content = ?, updateDate = now() WHERE idx = ? AND isDeleted = 0";
    let subject = req.body.subject;
    let content = req.body.content;
    let id = req.params.id;
    let params = [subject, content, id];
    let [rows, field] = await connection.query(sql, params);
    if (rows.changedRows > 0) {
      res.status(204).json();
    } else {
      res.status(400).json({ status: "400", message: "Not matched id" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----학사정보 게시글 GET----- */
exports.detail = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql = "SELECT * FROM degree WHERE isDeleted = 0 AND idx = ?";
    let id = req.params.id;
    let [rows, fields] = await connection.query(sql, id);
    if (rows[0]) {
      res.status(200).json({ status: "200", data: rows });
    } else {
      res.status(400).json({ status: "400", message: "Not matched id" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};
