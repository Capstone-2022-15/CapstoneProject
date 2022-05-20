const jwt = require("jsonwebtoken");
const fs = require("fs");
const { getConnection } = require("../model/getConnection");

const authkey = fs.readFileSync("./auth.json");
const { secret } = JSON.parse(authkey);
const SECRET_KEY = process.env.JWT_SECRET || secret;

exports.signout = async (req, res) => {
  const decoded = jwt.decode(req.headers.authorization, SECRET_KEY);
  const idx = decoded.id;
  const connection = await getConnection();
  const sql =
    "UPDATE member SET refresh_token = null WHERE idx = ? AND enabled = 0";
  const [rows, fields] = await connection.query(sql, idx);
  if (rows.affectedRows == 1) {
    res.status(200).json({
      code: "204",
      message: "로그아웃 되었습니다.",
    });
  } else if (rows.affectedRows > 1) {
    res.status(409).json({ status: "409", message: "광역 로그아웃 에러" });
  } else {
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
