const express = require("express");
//Cross-Origin Resource Sharing, 서버와 클라의 통신을 위한 모듈
const cors = require("cors");
const port = process.env.PORT || 3030;
const bodyParser = require("body-parser");
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/* -----Controller----- */
const announcement = require("./controller/announcement");
const degree = require("./controller/degree");
const scholarship = require("./controller/scholarship");
const community = require("./controller/community");

/* -----공지사항----- */
server.get("/api/announcement", announcement.show);
server.get("/api/announcement/:id", announcement.detail);
server.post("/api/announcement", function (req, res) {
  announcement.create(req, res);
});
server.delete("/api/announcement/:id", announcement.delete);
server.post("/api/announcement/:id", function (req, res) {
  announcement.update(req, res);
});

/* -----학사일정----- */
server.get("/api/degree", degree.show);
server.get("/api/degree/:id", degree.detail);
server.post("/api/degree", function (req, res) {
  degree.create(req, res);
});
server.delete("/api/degree/:id", degree.delete);
server.post("/api/degree/:id", function (req, res) {
  degree.update(req, res);
});

/* -----장학정보----- */
server.get("/api/scholarship", scholarship.show);
server.get("/api/scholarship/:id", scholarship.detail);
server.post("/api/scholarship", function (req, res) {
  scholarship.create(req, res);
});
server.delete("/api/scholarship/:id", scholarship.delete);
server.post("/api/scholarship/:id", function (req, res) {
  scholarship.update(req, res);
});

/* -----커뮤니티----- */
server.get("/api/community", community.show);
server.get("/api/community/:id", community.detail);
server.post("/api/community", function (req, res) {
  community.create(req, res);
});
server.delete("/api/community/:id", community.delete);
server.post("/api/community/:id", function (req, res) {
  community.update(req, res);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
