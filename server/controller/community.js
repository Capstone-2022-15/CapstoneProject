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

/* -----커뮤니티 전체 GET----- */
exports.show = async (req, res) => {
  try {
    const connection = await getConnection();
    const sql =
      "SELECT A.idx, A.config_idx, A.subject, A.content, A.writer, A.writer_nick, A.createDate, A.updateDate, A.hit, A.reply FROM community as A WHERE A.isDeleted = 0"; // 설정
    const [rows, fields] = await connection.query(sql);
    if (rows[0]) {
      res.status(200).json({ status: "200", data: rows });
    } else {
      res.status(200).json({ status: "200", data: rows });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----커뮤니티 POST----- */
exports.create = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "INSERT INTO community VALUES (null,?,?,?,?,?,now(),now(),0,?,0,0)";
    const config_idx = 4; // 설정
    const subject = req.body.subject;
    const content = req.body.content;
    const writer = req.body.writer;
    const writer_nick = req.body.writer_nick;
    const password = req.body.password;
    const params = [
      config_idx,
      subject,
      content,
      writer,
      writer_nick,
      password,
    ];
    let [rows, field] = await connection.query(sql, params);
    if (rows.affectedRows == 1) {
      // POST한 데이터의 ID 값을 가져온다.
      sql = "SELECT last_insert_id()";
      [rows, field] = await connection.query(sql);
      res.status(200).json({
        code: "204",
        contentId: rows[0],
      });
    } else if (rows.affectedRows > 1) {
      res
        .status(409)
        .json({ status: "409", message: "Posted more than expect" });
    } else {
      res.status(400).json({ status: "400", message: "Post fail" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----커뮤니티 DELETE----- */
exports.delete = async (req, res) => {
  try {
    const connection = await getConnection();
    // console.log(req.params.id);
    let sql = "UPDATE community SET isDeleted = 1 WHERE idx = ?";
    const params = [req.params.id];
    let [rows, field] = await connection.query(sql, params);
    if (rows.changedRows > 0) {
      //파일 테이블의 파일도 지운다.
      sql = "UPDATE communityFile SET isDeleted = 1 WHERE board_idx = ?";
      await connection.query(sql, params);
      //지워진 파일의 이름들을 가져온다.
      sql =
        "SELECT A.saveName FROM communityFile as A WHERE board_idx = ? AND isDeleted = 1";
      [rows, field] = await connection.query(sql, params);
      //실제 파일들을 지운다.
      for (i = 0; i < rows.length; i++) {
        if (fs.existsSync(`../../media/` + rows[i].saveName)) {
          try {
            fs.unlinkSync(`../../media/` + rows[i].saveName);
          } catch (error) {
            console.log(error);
          }
        } else {
          console.error(error);
          return res.status(500).json({
            code: 500,
            message: "서버 에러",
          });
        }
      }
      res.status(204).send();
    } else {
      res.status(400).json({ status: "400", message: "Not matched id" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----커뮤니티 UPDATE(POST w/ id)----- */
exports.update = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "UPDATE community SET subject = ?, content = ?, updateDate = now() WHERE idx = ? AND isDeleted = 0";
    const subject = req.body.subject;
    const content = req.body.content;
    const id = req.params.id;
    const params = [subject, content, id];
    const [rows, field] = await connection.query(sql, params);
    if (rows.changedRows > 0) {
      res.status(204).json();
    } else {
      res.status(400).json({ status: "400", message: "Not matched id" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----커뮤니티 게시글 GET----- */
exports.detail = async (req, res) => {
  try {
    const connection = await getConnection();
    let sql =
      "SELECT A.idx, A.config_idx, A.subject, A.content, A.writer, A.writer_nick, A.createDate, A.updateDate, A.hit, A.reply, A.password FROM community as A WHERE A.isDeleted = 0 AND A.idx = ?";
    const id = req.params.id;
    let [rows, fields] = await connection.query(sql, id);
    if (rows[0]) {
      res.status(200).json({ status: "200", data: rows });
      //게시글 정보
      const data = rows[0];
      sql =
        "SELECT A.saveName FROM communityFile as A WHERE A.board_idx = ? AND A.isDeleted = 0";
      [rows, fields] = await connection.query(sql, id);
      //파일 정보
      const image = rows;
      res.status(200).json({ status: "200", data: data, image: image });
      //조회수
      sql =
        "UPDATE community as A set A.hit = IFNULL(hit, 0) + 1 WHERE A.idx = ?";
      await connection.query(sql, id);
    } else {
      res.status(400).json({ status: "400", message: "Not matched id" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "400", message: error.message });
  }
};

/* -----커뮤니티 사진 불러오기----- */
exports.showImage = async (req, res) => {
  //이미지 saveName params으로 받아오기
  const name = req.params.image;
  await fs.readFile(`../../media/${name}`, (err, data) => {
    res.status(200).send(data);
  });
};

/* -----커뮤니티 사진 1개 POST----- */
exports.upload = async (req, res) => {
  try {
    const connection = await getConnection();
    const id = req.params.id;
    const originName = req.file.originalname;
    const saveName = req.file.filename;
    let sql = "INSERT INTO communityFile VALUES (null,?,?,?,0)";
    const params = [id, originName, saveName];
    const [rows, fields] = await connection.query(sql, params);
    if (rows.changedRows > 0) {
      res.status(204).json();
    } else {
      res.status(400).json({ status: "400", message: "Not matched id" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

/* -----커뮤니티 사진 여러개 POST----- */
exports.uploads = async (req, res) => {
  try {
    const connection = await getConnection();
    const id = req.params.id;
    let sql = "INSERT INTO communityFile VALUES (null,?,?,?,0)";
    for (i = 0; i < req.files.length; i++) {
      const originName = req.files[i].originalname;
      const saveName = req.files[i].filename;
      const params = [id, originName, saveName];
      const [rows, fields] = await connection.query(sql, params);
      if ((rows.changedRows = 0)) {
        res.status(400).json({ status: "400", message: "Not matched id" });
      }
    }
    res.status(204).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
