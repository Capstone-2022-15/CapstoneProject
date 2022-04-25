const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
// const cors = require("cors");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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

/* -----장학정보 전체 GET----- */
exports.show = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "SELECT * FROM scholarship WHERE isDeleted = 0 AND config_idx = 3"; // 설정
    let [rows, fields] = await connection.query(sql);
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};

/* -----장학정보 POST----- */
exports.create = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql = "INSERT INTO scholarship VALUES (null,?,?,?,?,?,now(),now(),0,?,0)";
    let config_idx = 3; // 설정
    let subject = req.body.subject;
    let content = req.body.content;
    let writer = req.body.writer;
    let writer_nick = req.body.writer_nick;
    let password = req.body.password;
    let params = [config_idx, subject, content, writer, writer_nick, password];
    await connection.query(sql, params, (error, rows, fields) => {
      res.send(rows);
    });
  } catch (error) {
    console.log(error);
  }
};

/* -----장학정보 DELETE----- */
exports.delete = async (req, res) => {
  try {
    const connection = await getConnection();
    // console.log(req.params.id);
    let sql = "UPDATE scholarship SET isDeleted = 1 WHERE idx = ?";
    let params = [req.params.id];
    connection.query(sql, params);
  } catch (error) {
    console.log(error);
  }
};

/* -----장학정보 UPDATE(POST w/ id)----- */
exports.update = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "UPDATE scholarship SET subject = ?, content = ?, updateDate = now() WHERE idx = ?";
    let subject = req.body.subject;
    let content = req.body.content;
    let id = req.params.id;
    let params = [subject, content, id];
    connection.query(sql, params);
  } catch (error) {
    console.log(error);
  }
};

/* -----장학정보 게시글 GET----- */
exports.detail = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "SELECT * FROM scholarship WHERE isDeleted = 0 AND config_idx = 1 AND idx = ?";
    let idx = req.params.id;
    let [rows, fields] = await connection.query(sql, idx);
    res.send(rows);
  } catch (error) {
    console.log(error);
  }
};