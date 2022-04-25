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

/* -----공지사항 전체 GET----- */
exports.show = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "SELECT * FROM announcement WHERE isDeleted = 0 AND config_idx = 1";
    let [rows, fields] = await connection.query(sql);
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

/* -----공지사항 POST----- */
exports.create = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql = "INSERT INTO announcement VALUES (null,?,?,?,?,?,now(),now(),0,?,0)";
    let config_idx = 1;
    let subject = req.body.subject;
    let content = req.body.content;
    let writer = req.body.writer;
    let writer_nick = req.body.writer_nick;
    let password = req.body.password;
    let params = [config_idx, subject, content, writer, writer_nick, password];
    await connection.query(sql, params);
    res.status(201).send({ status: "201" });
  } catch (error) {
    console.log(error);
  }
};

/* -----공지사항 DELETE----- */
exports.delete = async (req, res) => {
  try {
    const connection = await getConnection();
    // console.log(req.params.id);
    let sql = "UPDATE announcement SET isDeleted = 1 WHERE idx = ?";
    let params = [req.params.id];
    await connection.query(sql, params);
    res.status(200).send({ status: "200" });
  } catch (error) {
    console.log(error);
  }
};

/* -----공지사항 UPDATE(POST w/ id)----- */
exports.update = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "UPDATE announcement SET subject = ?, content = ?, updateDate = now() WHERE idx = ?";
    let subject = req.body.subject;
    let content = req.body.content;
    let id = req.params.id;
    let params = [subject, content, id];
    await connection.query(sql, params);
    res.status(200).send({ status: "200" });
  } catch (error) {
    console.log(error);
  }
};

/* -----공지사항 게시글 GET----- */
exports.detail = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "SELECT * FROM announcement WHERE isDeleted = 0 AND idx = ?";
    let idx = req.params.id;
    let [rows, fields] = await connection.query(sql, idx);
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};