const jwt = require("jsonwebtoken");
const fs = require("fs");
const { getConnection } = require("../model/getConnection");

const authkey = fs.readFileSync("./auth.json");
const { secret } = JSON.parse(authkey);
const SECRET_KEY = process.env.JWT_SECRET || secret;

exports.auth = async (req, res, next) => {
  /* 인증 완료 */
  try {
    // 요청 헤더에 저장된 토큰(req.headers.authorization)과 비밀키를 사용하여 토큰을 req.decoded에 반환
    req.decoded = jwt.verify(req.headers.authorization, SECRET_KEY);
    return next();
  } catch (error) {
    /* 인증 실패 */
    // 유효시간이 초과된 경우
    if (error.name === "TokenExpiredError") {
      //DB에서 refresh_token 가져오기
      const connection = await getConnection();
      const userInfo = jwt.decode(req.headers.authorization, SECRET_KEY);
      const id = userInfo.id;
      const sql =
        "SELECT A.refresh_token FROM member as A WHERE A.idx = ? AND enabled = 0";
      const [rows, fields] = await connection.query(sql, id);
      //가져온 refresh_token 인증하기
      try {
        const N = jwt.verify(rows[0].refresh_token, SECRET_KEY);
        //새 access token 발급하기
        const newToken = jwt.sign(
          {
            type: "JWT",
            id: N.id,
            name: N.name,
          },
          SECRET_KEY,
          {
            expiresIn: "15m",
            issuer: "Austin",
          }
        );
        return res.status(200).json({
          code: 200,
          message: "새 토큰이 발급되었습니다.",
          token: newToken,
        });
      } catch (error) {
        //refresh_token 만료인 경우
        if (error.name === "TokenExpiredError") {
          return res.status(419).json({
            code: 419,
            message: "로그인이 필요합니다.",
          });
        }
        if (error.name === "JsonWebTokenError") {
          return res.status(401).json({
            code: 401,
            message: "유효하지 않은 토큰입니다.",
          });
        }
      }
    }
    // 토큰의 비밀키가 일치하지 않는 경우
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        code: 401,
        message: "유효하지 않은 토큰입니다.",
      });
    }
  }
};
