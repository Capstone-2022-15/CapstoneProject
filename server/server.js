const express = require("express");
//Cross-Origin Resource Sharing : 다중 서버 접속
const cors = require("cors");
// const multer = require("multer");
require("dotenv").config({ path: "../.env" });

const host = "0.0.0.0";
const port = process.env.PORT || 3030;
const bodyParser = require("body-parser");
const imageParser = bodyParser.urlencoded({ extended: false });
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
const { upload } = require("./controller/imageMiddleware");
/* -----Auth----- */
const { login } = require("./auth/login");
const { signup } = require("./auth/signup");
const { deleteAcc } = require("./auth/deleteAcc");
const { auth } = require("./auth/authMiddleware");
const { signout } = require("./auth/signout");
/* -----사용자 인증----- */
server.post("/api/login", function (req, res) {
  login(req, res);
});
server.post("/api/signup", function (req, res) {
  signup(req, res);
});
server.delete("/api/user/delete", function (req, res) {
  deleteAcc(req, res);
});
server.post("/api/signout", function (req, res) {
  signout(req, res);
});
/* -----공지사항----- */
server.get("/api/announcement", auth, announcement.show); //전체 GET
server.get("/api/announcement/:id", auth, announcement.detail); //게시물 하나 GET
server.get("/api/announcement/:id/:image", auth, announcement.showImage); //게시물의 image GET
server.post("/api/announcement", auth, function (req, res) {
  announcement.create(req, res);
}); //게시물 POST
server.post(
  "/api/announcement/upload/:id",
  auth,
  imageParser,
  upload.single("img"),
  announcement.upload
); //게시물의 1개의 이미지 POST
server.post(
  "/api/announcement/upload/multi/:id",
  auth,
  imageParser,
  upload.array("img"),
  announcement.uploads
); //게시물의 여러개의 이미지 POST
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
server.get("/api/degree/:id/:image", auth, degree.showImage); //게시물의 image GET
server.post("/api/degree", auth, function (req, res) {
  degree.create(req, res);
});
server.post(
  "/api/degree/upload/:id",
  auth,
  imageParser,
  upload.single("img"),
  degree.upload
); //게시물의 1개의 이미지 POST
server.post(
  "/api/degree/upload/multi/:id",
  auth,
  imageParser,
  upload.array("img"),
  degree.uploads
); //게시물의 여러개의 이미지 POST
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
server.get("/api/scholarship/:id/:image", auth, scholarship.showImage); //게시물의 image GET
server.post("/api/scholarship", auth, function (req, res) {
  scholarship.create(req, res);
});
server.post(
  "/api/scholarship/upload/:id",
  auth,
  imageParser,
  upload.single("img"),
  scholarship.upload
); //게시물의 1개의 이미지 POST
server.post(
  "/api/scholarship/upload/multi/:id",
  auth,
  imageParser,
  upload.array("img"),
  scholarship.uploads
); //게시물의 여러개의 이미지 POST

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
server.get("/api/community/:id/:image", auth, community.showImage); //게시물의 image GET
server.post("/api/community", auth, function (req, res) {
  community.create(req, res);
});
server.post(
  "/api/community/upload/:id",
  auth,
  imageParser,
  upload.single("img"),
  community.upload
); //게시물의 1개의 이미지 POST
server.post(
  "/api/community/upload/multi/:id",
  auth,
  imageParser,
  upload.array("img"),
  community.uploads
); //게시물의 여러개의 이미지 POST

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
