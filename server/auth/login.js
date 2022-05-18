const jwt = require("jsonwebtoken");
const fs = require("fs");
const mysql = require("mysql2/promise");

const data = fs.readFileSync("./database.json");
const authkey = fs.readFileSync("./auth.json");
const conf = JSON.parse(data);
const { secret } = JSON.parse(authkey);
const SECRET_KEY = process.env.JWT_SECRET || secret;

const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database,
  });
  return connection;
};

exports.login = async (req, res) => {
  try {
    const connection = await getConnection();
    const sql =
      "SELECT EXISTS (SELECT * FROM member as A WHERE A.id=? AND A.password=? AND A.enabled = 0) as isThere";
    const id = req.body.id;
    const password = req.body.password;
    const params = [id, password];
    const [rows, fields] = await connection.query(sql, params); // 1이면 존재함, 0이면 없음
    if (rows[0].isThere == 1) {
      //DB에서 정보 얻어오기
      const sql =
        "SELECT A.idx, A.name FROM member as A WHERE A.id = ? AND A.password = ? AND enabled = 0";
      const [rows, fields] = await connection.query(sql, params);
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
      // const refresh_token = jwt.sign(
      //   {
      //     type: "JWT",
      //     id: rows[0].idx,
      //     name: rows[0].name,
      //   },
      //   SECRET_KEY,
      //   {
      //     expiresIn: "180 days",
      //     issuer: "Austin",
      //   }
      // );

      res.status(200).json({
        code: 200,
        message: "토큰이 발급되었습니다.",
        token: token,
      });
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