const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../../media/");
  },
  filename: (req, file, callback) => {
    let saveName = "";
    const ext = path.extname(file.originalname);
    for (i = 0; i < file.originalname.length; i++) {
      saveName += file.originalname.charCodeAt(i);
    }
    callback(null, Date.now() + "-" + saveName + ext);
  },
});

exports.upload = multer({ storage: storage });
