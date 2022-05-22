const { getConnection } = require("../model/getConnection");

exports.calendar = async (req, res) => {
  try {
    const connection = await getConnection();
    //일정이 있는 게시물만 SELECT
    const sql = `SELECT A.idx, A.config_idx, A.subject, A.startDate, A.finalDate FROM board as A WHERE A.startDate IN (SELECT B.startDate FROM board as B) AND isDeleted = 0`;
    const [rows, field] = await connection.query(sql);
    res.status(200).json({
      code: "200",
      data: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};
