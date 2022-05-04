const fs = require("fs");

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

/* -----학사정보 댓글 전체 GET----- */
exports.show = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "SELECT C.idx, C.member_id, C.member_nick, C.createDate, C.updateDate, C.Content FROM communityComments as C WHERE C.ref = ? AND C.isDeleted = 0 ORDER BY C.idx ASC";
    let params = [req.params.id];
    let [rows, fields] = await connection.query(sql, params);
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

/* -----학사정보 댓글 POST----- */
exports.create = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "INSERT INTO communityComments VALUES (null,?,?,?,now(),?,now(),0)";
    let id = req.params.id;
    let member_id = req.body.member_id;
    let member_nick = req.body.member_nick;
    let content = req.body.content;
    let params = [id, member_id, member_nick, content];
    let [rows, field] = await connection.query(sql, params);
    if (rows.affectedRows == 1) {
      sql =
        "UPDATE community as A set A.reply = (SELECT COUNT(*) FROM communityComments as C WHERE C.ref = A.idx AND isDeleted = 0) WHERE A.idx = ?";
      let [rows, field] = await connection.query(sql, id);
      if ((rows.affectedRows = 1)) {
        res.status(204).json();
      } else {
        res
          .status(200)
          .json({ status: "204", message: "WARNING: reply update error" });
      }
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

/* -----학사정보 댓글 DELETE----- */
exports.delete = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "UPDATE communityComments as C SET C.isDeleted = 1 WHERE C.ref = ? AND C.idx = ?";
    let id = req.params.id;
    let idx = req.params.idx;
    let params = [id, idx];
    let [rows, field] = await connection.query(sql, params);
    if (rows.changedRows > 0) {
      sql =
        "UPDATE community as A set A.reply = (SELECT COUNT(*) FROM communityComments as C WHERE C.ref = A.idx AND isDeleted = 0) WHERE A.idx = ?";
      let [rows, field] = await connection.query(sql, id);
      if ((rows.affectedRows = 1)) {
        res.status(204).json();
      } else {
        res
          .status(200)
          .json({ status: "204", message: "WARNING: reply update error" });
      }
    } else {
      res.status(400).json({ status: "400", message: "Not matched id" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----학사정보 댓글 UPDATE(POST w/ id)----- */
exports.update = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "UPDATE communityComments as C SET C.content = ?, C.updateDate = now() WHERE C.ref = ? AND C.idx = ? AND C.isDeleted = 0";
    let content = req.body.content;
    let id = req.params.id;
    let idx = req.params.idx;
    let params = [content, id, idx];
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
