const jwt = require("jsonwebtoken");
const fs = require("fs");
const { getConnection } = require("../model/getConnection")

const authkey = fs.readFileSync("./auth.json");
const { secret } = JSON.parse(authkey);
const SECRET_KEY = process.env.JWT_SECRET || secret;

exports.login = async (req, res) => {
  try {
    const connection = await getConnection();
    const sql =
      "SELECT EXISTS (SELECT * FROM member as A WHERE A.id = ? AND A.password = ? AND A.enabled = 0) as isThere";
    const id = req.body.id;
    const password = req.body.password;
    let params = [id, password];
    let [rows, fields] = await connection.query(sql, params); // 1이면 존재함, 0이면 없음
    if (rows[0].isThere == 1) {
      //DB에서 정보 얻어오기
      let sql =
        "SELECT A.idx, A.name FROM member as A WHERE A.id = ? AND A.password = ? AND enabled = 0";
      [rows, fields] = await connection.query(sql, params);
      const idx = rows[0].idx;
      //access 토큰 생성
      const token = jwt.sign(
        {
          type: "JWT",
          id: rows[0].idx,
          name: rows[0].name,
        },
        SECRET_KEY,
        {
          expiresIn: "15m",
          issuer: "Austin",
        }
      );
      //refresh 토큰 생성
      const refresh_token = jwt.sign(
        {
          type: "JWT",
          id: rows[0].idx,
          name: rows[0].name,
        },
        SECRET_KEY,
        {
          expiresIn: "30 days",
          issuer: "Austin",
        }
      );
      //refresh_token 저장
      sql = "UPDATE member SET refresh_token = ? WHERE idx = ? AND enabled = 0";
      params = [refresh_token, idx];
      try {
        [rows, fields] = await connection.query(sql, params);
        res.status(200).json({
          code: 200,
          message: "토큰이 발급되었습니다.",
          token: token,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          code: 500,
          message: "서버 에러",
        });
      }
    } else {
      //회원 가입 유도
      res.status(200).json({
        code: 200,
        message: "ID나 PASSWORD가 틀렸거나 없다.",
        token: null,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
//bcrypt로 암호화 가능
