const express = require("express");
//Cross-Origin Resource Sharing, 서버와 클라의 통신을 위한 모듈
const cors = require("cors");
const host = "0.0.0.0";
const port = process.env.PORT || 3030;
const bodyParser = require("body-parser");
const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

/* -----Controller----- */
const announcement = require("./controller/announcement");
const announcementComments = require("./controller/announcomments");
const degree = require("./controller/degree");
const degreeComments = require("./controller/degreecomments");
const scholarship = require("./controller/scholarship");
const scholarshipComments = require("./controller/scholarcomments");
const community = require("./controller/community");
const communityComments = require("./controller/communitycomments");

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

server.get("/api/announcement/:id/comments", announcementComments.show);
server.post("/api/announcement/:id/comments", announcementComments.create);
server.delete("/api/announcement/:id/comments/:idx", announcementComments.delete);
server.post("/api/announcement/:id/comments/:idx", announcementComments.update);

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

server.get("/api/degree/:id/comments", degreeComments.show);
server.post("/api/degree/:id/comments", degreeComments.create);
server.delete("/api/degree/:id/comments/:idx", degreeComments.delete);
server.post("/api/degree/:id/comments/:idx", degreeComments.update);

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

server.get("/api/scholarship/:id/comments", scholarshipComments.show);
server.post("/api/scholarship/:id/comments", scholarshipComments.create);
server.delete("/api/scholarship/:id/comments/:idx", scholarshipComments.delete);
server.post("/api/scholarship/:id/comments/:idx", scholarshipComments.update);

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

server.get("/api/community/:id/comments", communityComments.show);
server.post("/api/community/:id/comments", communityComments.create);
server.delete("/api/community/:id/comments/:idx", communityComments.delete);
server.post("/api/community/:id/comments/:idx", communityComments.update);

server.listen(port, host, () => {
  console.log(`Listening on port ${port}`);
});
