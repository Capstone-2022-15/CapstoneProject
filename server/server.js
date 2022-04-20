const express = require("express");
//Cross-Origin Resource Sharing, 서버와 클라의 통신을 위한 모듈
const cors = require("cors");
const port = process.env.PORT || 3030;
const server = express();
server.use(cors());

//공지사항 모듈
const announcement = require("./announcement");

/* -----공지사항----- */
server.get("/api/announcement", announcement.show);
server.post("/api/announcement", function (req, res) {
  announcement.create;
});
server.delete("/api/announcement/:id", announcement.delete);
server.post("/api/announcement/:id", function (req, res) {
  announcement.update;
});


server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});