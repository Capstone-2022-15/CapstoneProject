const { getConnection } = require("../model/getConnection");

/* -----댓글 전체 GET----- */
exports.show = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      sql = `SELECT C.idx, C.member_id, C.member_nick, C.createDate, C.updateDate, C.Content FROM comments as C WHERE C.ref = ? AND C.isDeleted = 0 ORDER BY C.idx ASC`;
      let params = [req.params.id];
      [rows, fields] = await connection.query(sql, params);
      if (rows[0]) {
        res.status(200).json({ status: "200", data: rows });
      } else {
        res.status(200).json({ status: "200", message: "Nothing :)" });
      }
    } else {
      res.status(404).json({ status: "404", message: "Wrong URL" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

/* -----댓글 POST----- */
exports.create = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      sql = `INSERT INTO comments VALUES (null,?,?,?,now(),?,now(),0)`;
      let id = req.params.id;
      let member_id = req.body.member_id;
      let member_nick = req.body.member_nick;
      let content = req.body.content;
      let params = [id, member_id, member_nick, content];
      [rows, field] = await connection.query(sql, params);
      if (rows.affectedRows == 1) {
        //댓글 수 올리기
        sql = `UPDATE board as A set A.reply = (SELECT COUNT(*) FROM comments as C WHERE C.ref = A.idx AND isDeleted = 0) WHERE A.idx = ?`;
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
    } else {
      res.status(404).json({ status: "404", message: "Wrong URL" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

/* -----댓글 DELETE----- */
exports.delete = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      sql = `UPDATE comments as C SET C.isDeleted = 1 WHERE C.ref = ? AND C.idx = ?`;
      let id = req.params.id;
      let idx = req.params.idx;
      let params = [id, idx];
      [rows, field] = await connection.query(sql, params);
      if (rows.changedRows > 0) {
        //댓글 수 재조정
        sql = `UPDATE board as A set A.reply = (SELECT COUNT(*) FROM comments as C WHERE C.ref = A.idx AND isDeleted = 0) WHERE A.idx = ?`;
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
    } else {
      res.status(404).json({ status: "404", message: "Wrong URL" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

/* -----댓글 UPDATE(POST w/ id)----- */
exports.update = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      let sql = `UPDATE comments as C SET C.content = ?, C.updateDate = now() WHERE C.ref = ? AND C.idx = ? AND C.isDeleted = 0`;
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
    } else {
      res.status(404).json({ status: "404", message: "Wrong URL" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
