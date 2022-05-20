const fs = require("fs");
const mysql = require("mysql2/promise");

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);

exports.getConnection = async () => {
  const connection = await mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    database: conf.database,
  });
  return connection;
};