const fs = require("fs");

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);
const mysql = require("mysql2/promise");

const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database,
  });
  return connection;
};

exports.signup = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "SELECT EXISTS (SELECT * FROM member as A WHERE A.id=? AND A.enabled = 0) as isThere";
    const id = req.body.id;
    const password = req.body.password;
    const name = req.body.name;
    const nick = req.body.nick;
    const gender = req.body.gender;
    let [rows, fields] = await connection.query(sql, id); // 1이면 존재함, 0이면 없음
    if ((rows[0].isThere == 0)) {
      //회원가입 진행
      sql = "INSERT INTO member VALUES (null,?,?,?,?,?,0,now(),null,0)";
      const params = [id, password, name, nick, gender];
      [rows, fields] = await connection.query(sql, params);
      if (rows.affectedRows == 1) {
        //멤버 역할 지정 (학생 default)
        sql = "SELECT A.idx FROM member as A WHERE A.id = ?";
        [rows, fields] = await connection.query(sql, id);
        const idx = rows[0].idx;
        sql = "INSERT INTO member_role VALUES (null,?,1)";
        await connection.query(sql, idx);
        res.status(204).json();
      } else if (rows.affectedRows > 1) {
        res
          .status(409)
          .json({ code: "409", message: "Posted more than expect" });
      } else {
        res.status(400).json({ code: "400", message: "등록 실패" });
      }
    } else {
      //이미 있는 ID
      res.status(200).json({
        code: 200,
        message: "이미 있는 ID이다.",
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
