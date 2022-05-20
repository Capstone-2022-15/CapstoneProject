const { getConnection } = require("../model/getConnection")

exports.search = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.body.category;
    const where = req.body.where;
    const what = "%" + req.body.what + "%";
    const params = [what]
    console.log(params);
    let sql = `SELECT A.idx, A.subject, A.content, A.writer, A.writer_nick FROM ${category} as A WHERE A.${where} LIKE ?`
    let [rows, fields] = await connection.query(sql, params);
    if(rows[0]){
      res.status(200).json({
        code: 200,
        data: rows
      })
    } else {

    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
}