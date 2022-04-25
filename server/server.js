const express = require("express");
//Cross-Origin Resource Sharing, 서버와 클라의 통신을 위한 모듈
const cors = require("cors");
const port = process.env.PORT || 3030;
const server = express();
server.use(cors());

/* -----MODELS----- */
const announcement = require("./models/announcement");
const degree = require("./models/degree");

/* -----공지사항----- */
server.get("/api/announcement", announcement.show);
server.get("/api/announcement/:id", announcement.detail);
server.post("/api/announcement", function (req, res) {
  announcement.create;
});
server.delete("/api/announcement/:id", announcement.delete);
server.post("/api/announcement/:id", function (req, res) {
  announcement.update;
});

/* -----학사일정----- */
server.get("/api/degree", degree.show);
server.get("/api/degree/:id", degree.detail);
server.post("/api/degree", function (req, res) {
  degree.create;
});
server.delete("/api/degree/:id", degree.delete);
server.post("/api/degree/:id", function (req, res) {
  degree.update;
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
