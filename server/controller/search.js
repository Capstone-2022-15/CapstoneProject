const { getConnection } = require("../model/getConnection");

exports.search = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.body.category;
    const where = req.body.where;
    const what = "%" + req.body.what + "%";
    if (category == "whole") {
      const params = [what];
      sql = `SELECT A.idx, A.config_idx, A.subject, A.content, A.writer, A.writer_nick FROM board as A WHERE A.isDeleted = 0 AND A.${where} LIKE ?`;
      [rows, fields] = await connection.query(sql, params);
      if (rows[0]) {
        res.status(200).json({
          code: 200,
          data: rows,
        });
      } else {
        res.status(200).json({ status: "200", message: "Nothing :)" });
      }
    } else {
      let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
      let [rows, fields] = await connection.query(sql, category);
      if (rows[0]) {
        const config_idx = rows[0].idx;
        sql = `SELECT A.idx, A.config_idx, A.subject, A.content, A.writer, A.writer_nick FROM board as A WHERE A.isDeleted = 0 AND A.config_idx = ? AND A.${where} LIKE ?`;
        const params = [config_idx, what];
        [rows, fields] = await connection.query(sql, params);
        res.status(200).json({
          code: 200,
          data: rows,
        });
      } else {
        res.status(404).json({ status: "404", message: "Wrong category" });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
