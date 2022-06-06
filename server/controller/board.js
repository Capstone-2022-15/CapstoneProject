const fs = require("fs");
const { getConnection } = require("../model/getConnection");

/* ----- 카테고리 전체 GET----- */
exports.showAll = async (req, res) => {
  try {
    let data = [];
    const connection = await getConnection();
    for (i = 1; i < 5; i++) {
      sql = `SELECT A.idx, A.config_idx, A.subject FROM board as A WHERE A.config_idx = ${i} AND A.isDeleted = 0 ORDER BY A.idx DESC LIMIT 5`;
      [rows, fields] = await connection.query(sql);
      data.push(rows);
    }
    res.status(200).json({ status: "200", data: data });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* ----- 카테고리 하나 전체 GET----- */
exports.show = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      const config_idx = rows[0].idx;
      sql = `SELECT A.idx, A.config_idx, A.subject, A.content, A.writer, A.writer_nick, A.createDate, A.updateDate, A.hit, A.reply FROM board as A WHERE A.config_idx = ? AND A.isDeleted = 0 ORDER BY A.idx DESC`;
      [rows, fields] = await connection.query(sql, config_idx);
      res.status(200).json({ status: "200", data: rows });
    } else {
      res.status(404).json({ status: "404", message: "Wrong URL" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----게시물 POST----- */
exports.create = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      sql = `INSERT INTO board VALUES (null,?,?,?,?,?,now(),now(),?,?,0,?,0,0)`;
      const config_idx = rows[0].idx;
      const subject = req.body.subject;
      const content = req.body.content;
      const writer = req.body.writer;
      const writer_nick = req.body.writer_nick;
      const password = req.body.password;
      let startdate = req.body.startdate;
      let finaldate = req.body.finaldate;
      // 시작일 과 마지막일 중 하나가 null 일 경우
      if (req.body.startdate == null || req.body.finaldate == null) {
        startdate = null;
        finaldate = null;
        // 둘다 null로 만든다.
      }
      const params = [
        config_idx,
        subject,
        content,
        writer,
        writer_nick,
        startdate,
        finaldate,
        password,
      ];
      [rows, field] = await connection.query(sql, params);
      if (rows.affectedRows == 1) {
        // POST한 데이터의 ID 값을 가져온다.
        sql = "SELECT last_insert_id()";
        [rows, field] = await connection.query(sql);
        res.status(200).json({
          code: "204",
          contentId: rows[0],
        });
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
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----게시물 및 파일 DELETE----- */
exports.delete = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      const config_idx = rows[0].idx;
      const id = req.params.id;
      sql = `UPDATE board SET isDeleted = 1 WHERE idx = ? AND config_idx = ?`;
      const params = [id, config_idx];
      [rows, field] = await connection.query(sql, params);
      if (rows.changedRows > 0) {
        //댓글도 지운다.
        sql = `UPDATE comments as C SET C.isDeleted = 1 WHERE C.ref = ?`;
        await connection.query(sql, id);
        //파일 테이블의 파일도 지운다.
        sql = `UPDATE files SET isDeleted = 1 WHERE board_idx = ?`;
        await connection.query(sql, id);
        //지워진 파일의 이름들을 가져온다.
        sql = `SELECT A.saveName FROM files as A WHERE board_idx = ? AND isDeleted = 1`;
        [rows, field] = await connection.query(sql, id);
        //실제 파일들을 지운다.
        for (i = 0; i < rows.length; i++) {
          if (fs.existsSync(`../../media/` + rows[i].saveName)) {
            try {
              fs.unlinkSync(`../../media/` + rows[i].saveName);
            } catch (error) {
              console.log(error);
            }
          } else {
            console.error(error);
            return res.status(500).json({
              code: 500,
              message: "서버 에러",
            });
          }
        }
        res.status(204).send();
      } else {
        res.status(400).json({ status: "400", message: "Not matched id" });
      }
    } else {
      res.status(404).json({ status: "404", message: "Wrong URL" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----게시물 UPDATE(POST w/ id)----- */
exports.update = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      const config_idx = rows[0].idx;
      sql = `UPDATE board SET subject = ?, content = ?, startDate = ?, finalDate = ?, updateDate = now() WHERE idx = ? AND isDeleted = 0 AND config_idx = ?`;
      const subject = req.body.subject;
      const content = req.body.content;
      const id = req.params.id;
      let startdate = req.body.startdate;
      let finaldate = req.body.finaldate;
      // 시작일 과 마지막일 중 하나가 null 일 경우
      if (req.body.startdate == null || req.body.finaldate == null) {
        startdate = null;
        finaldate = null;
        // 둘다 null로 만든다.
      }
      const params = [subject, content, startdate, finaldate, id, config_idx];
      [rows, field] = await connection.query(sql, params);
      if (rows.changedRows > 0) {
        res.status(204).json();
      } else {
        res.status(400).json({ status: "400", message: "Not matched id" });
      }
    } else {
      res.status(404).json({ status: "404", message: "Wrong URL" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----게시글 GET----- */
exports.detail = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      const config_idx = rows[0].idx;
      sql = `SELECT A.idx, A.config_idx, A.subject, A.content, A.writer, A.writer_nick, A.createDate, A.updateDate, A.hit, A.reply, A.password FROM board as A WHERE A.isDeleted = 0 AND A.idx = ? AND A.config_idx = ?`;
      const id = req.params.id;
      const params = [id, config_idx];
      [rows, fields] = await connection.query(sql, params);
      if (rows[0]) {
        //게시글 정보
        const data = rows[0];
        sql = `SELECT A.idx, A.saveName FROM files as A WHERE A.board_idx = ? AND A.isDeleted = 0`;
        [rows, fields] = await connection.query(sql, id);
        //파일 정보
        const image = rows;
        res.status(200).json({ status: "200", data: data, image: image });
        //조회수 올림
        sql = `UPDATE board as A set A.hit = IFNULL(hit, 0) + 1 WHERE A.idx = ?`;
        await connection.query(sql, id);
      } else {
        res.status(400).json({ status: "400", message: "Not matched id" });
      }
    } else {
      res.status(404).json({ status: "404", message: "Wrong URL" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};
