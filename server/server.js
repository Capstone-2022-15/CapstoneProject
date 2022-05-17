const express = require("express");
//Cross-Origin Resource Sharing : 다중 서버 접속
const cors = require("cors");
// const multer = require("multer");
require("dotenv").config({ path: "../.env" });

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
/* -----Auth----- */
const { login } = require("./auth/login");
const { signup } = require("./auth/signup");
const { auth } = require("./auth/authMiddleware"); //나중에 적용
/* -----사용자 인증----- */
server.post("/api/login", function (req, res) {
  login(req, res);
});
server.post("/api/signup", function (req, res) {
  signup(req, res);
});
/* -----공지사항----- */
server.get("/api/announcement", auth, announcement.show);
server.get("/api/announcement/:id", auth, announcement.detail);
server.post("/api/announcement", auth, function (req, res) {
  announcement.create(req, res);
});
server.delete("/api/announcement/:id", auth, announcement.delete);
server.post("/api/announcement/:id", auth, function (req, res) {
  announcement.update(req, res);
});

server.get("/api/announcement/:id/comments", auth, announcementComments.show);
server.post(
  "/api/announcement/:id/comments",
  auth,
  announcementComments.create
);
server.delete(
  "/api/announcement/:id/comments/:idx",
  auth,
  announcementComments.delete
);
server.post("/api/announcement/:id/comments/:idx", announcementComments.update);

/* -----학사일정----- */
server.get("/api/degree", auth, degree.show);
server.get("/api/degree/:id", auth, degree.detail);
server.post("/api/degree", auth, function (req, res) {
  degree.create(req, res);
});
server.delete("/api/degree/:id", auth, degree.delete);
server.post("/api/degree/:id", auth, function (req, res) {
  degree.update(req, res);
});

server.get("/api/degree/:id/comments", auth, degreeComments.show);
server.post("/api/degree/:id/comments", auth, degreeComments.create);
server.delete("/api/degree/:id/comments/:idx", auth, degreeComments.delete);
server.post("/api/degree/:id/comments/:idx", auth, degreeComments.update);

/* -----장학정보----- */
server.get("/api/scholarship", auth, scholarship.show);
server.get("/api/scholarship/:id", auth, scholarship.detail);
server.post("/api/scholarship", auth, function (req, res) {
  scholarship.create(req, res);
});
server.delete("/api/scholarship/:id", auth, scholarship.delete);
server.post("/api/scholarship/:id", auth, function (req, res) {
  scholarship.update(req, res);
});

server.get("/api/scholarship/:id/comments", auth, scholarshipComments.show);
server.post("/api/scholarship/:id/comments", auth, scholarshipComments.create);
server.delete(
  "/api/scholarship/:id/comments/:idx",
  auth,
  scholarshipComments.delete
);
server.post(
  "/api/scholarship/:id/comments/:idx",
  auth,
  scholarshipComments.update
);

/* -----커뮤니티----- */
server.get("/api/community", auth, community.show);
server.get("/api/community/:id", auth, community.detail);
server.post("/api/community", auth, function (req, res) {
  community.create(req, res);
});
server.delete("/api/community/:id", auth, community.delete);
server.post("/api/community/:id", auth, function (req, res) {
  community.update(req, res);
});

server.get("/api/community/:id/comments", auth, communityComments.show);
server.post("/api/community/:id/comments", auth, communityComments.create);
server.delete(
  "/api/community/:id/comments/:idx",
  auth,
  communityComments.delete
);
server.post("/api/community/:id/comments/:idx", auth, communityComments.update);

server.listen(port, host, () => {
  console.log(`Listening on port ${port}`);
});
