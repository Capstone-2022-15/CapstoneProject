const jwt = require("jsonwebtoken");
const fs = require("fs");
require("dotenv").config();

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

exports.getToken = async (req, res) => {
  try {
    const connection = await getConnection();
    const sql =
      "SELECT EXISTS (SELECT * FROM member as A WHERE A.id=? AND A.password=? AND A.enabled = 0) as isThere";
    const id = req.body.id;
    const password = req.body.password;
    const params = [id, password];
    const [rows, fields] = await connection.query(sql, params); // 1이면 존재함, 0이면 없음
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
