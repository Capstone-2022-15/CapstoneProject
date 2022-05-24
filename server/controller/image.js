const fs = require("fs");
const { getConnection } = require("../model/getConnection");

/* -----사진 불러오기----- */
exports.showImage = async (req, res) => {
  //이미지 saveName params으로 받아오기
  const name = req.params.image;
  fs.readFile(`../../media/${name}`, (err, data) => {
    res.status(200).send(data);
  });
};

/* -----사진 1개 POST----- */
exports.upload = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      const id = req.params.id;
      const originName = req.file.originalname;
      const saveName = req.file.filename;
      let sql = `INSERT INTO files VALUES (null,?,?,?,0)`;
      const params = [id, originName, saveName];
      const [rows, fields] = await connection.query(sql, params);
      if ((rows.changedRows = 0)) {
        res.status(400).json({ status: "400", message: "Not matched id" });
      } else {
        res.status(204).json();
      }
    } else {
      res.status(404).json({ status: "404", message: "Wrong URL" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

/* -----사진 여러개 POST----- */
exports.uploads = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      const id = req.params.id;
      let sql = `INSERT INTO files VALUES (null,?,?,?,0)`;
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
    } else {
      res.status(404).json({ status: "404", message: "Wrong URL" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};

/* -----사진 DELETE----- */
exports.delete = async (req, res) => {
  try {
    const connection = await getConnection();
    const category = req.params.category;
    let sql = `SELECT A.idx FROM config as A WHERE A.tableName = ?`;
    let [rows, fields] = await connection.query(sql, category);
    if (rows[0]) {
      const name = req.params.image;
      const id = req.params.id;
      //테이블의 파일 삭제
      sql = `UPDATE files SET isDeleted = 1 WHERE board_idx = ?`;
      [rows, fields] = await connection.query(sql, id);
      if (rows.changedRows == 0) {
        res.status(400).json({ status: "400", message: "Not matched id" });
      } else {
        //실제 파일 삭제
        fs.unlinkSync(`../../media/${name}`);
        res.status(204).json();
      }
    } else {
      res.status(404).json({ status: "404", message: "Wrong URL" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
};
