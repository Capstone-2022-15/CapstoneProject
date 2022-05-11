const fs = require("fs");
// const cors = require("cors");
// app.use(cors());

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql2/promise");

const getConnection = async () => {
  const connection = await mysql.createConnection({
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
    const sql =
      "SELECT A.idx, A.config_idx, A.subject, A.content, A.writer, A.writer_nick, A.createDate, A.updateDate, A.hit, A.reply FROM degree as A WHERE A.isDeleted = 0"; // 설정
    const [rows, fields] = await connection.query(sql);
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
    const sql =
      "INSERT INTO degree VALUES (null,?,?,?,?,?,now(),now(),0,?,0,0)";
    const config_idx = 2; // 설정
    const subject = req.body.subject;
    const content = req.body.content;
    const writer = req.body.writer;
    const writer_nick = req.body.writer_nick;
    const password = req.body.password;
    const params = [
      config_idx,
      subject,
      content,
      writer,
      writer_nick,
      password,
    ];
    const [rows, field] = await connection.query(sql, params);
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
    const sql = "UPDATE degree SET isDeleted = 1 WHERE idx = ?";
    const params = [req.params.id];
    const [rows, field] = await connection.query(sql, params);
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
    const sql =
      "UPDATE degree SET subject = ?, content = ?, updateDate = now() WHERE idx = ? AND isDeleted = 0";
    const subject = req.body.subject;
    const content = req.body.content;
    const id = req.params.id;
    const params = [subject, content, id];
    const [rows, field] = await connection.query(sql, params);
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
    const sql =
      "SELECT A.idx, A.config_idx, A.subject, A.content, A.writer, A.writer_nick, A.createDate, A.updateDate, A.hit, A.reply, A.password FROM degree as A WHERE A.isDeleted = 0 AND A.idx = ?";
    const id = req.params.id;
    const [rows, fields] = await connection.query(sql, id);
    if (rows[0]) {
      res.status(200).json({ status: "200", data: rows });
      const sql = "UPDATE degree as A set A.hit = IFNULL(hit, 0) + 1 WHERE A.idx = ?";
      await connection.query(sql, id);
    } else {
      res.status(400).json({ status: "400", message: "Not matched id" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};
