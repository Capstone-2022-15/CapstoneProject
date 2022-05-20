const fs = require("fs");
const { getConnection } = require("../model/getConnection")

exports.deleteAcc = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql = "UPDATE member SET enabled = 1 WHERE id = ? AND password = ? AND name = ?";
    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;
    const params = [id, password, name];
    const [rows, field] = await connection.query(sql, params);
    if (rows.changedRows > 0) {
      res.status(204).send();
    } else {
      res.status(400).json({ status: "400", message: "Not matched user" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
}