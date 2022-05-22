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

/* -----Controller & Middleware----- */
const board = require("./controller/board");
const comments = require("./controller/comments");
const { upload } = require("./controller/imageMiddleware");
const { search } = require("./controller/search");
const { calendar } = require("./controller/calendar");
/* -----Auth & Middleware----- */
const { login } = require("./auth/login");
const { signup } = require("./auth/signup");
const { deleteAcc } = require("./auth/deleteAcc");
const { auth } = require("./auth/authMiddleware");
const { signout } = require("./auth/signout");

/* -----사용자 인증----- */
server.post("/api/login", (req, res) => login(req, res));
server.post("/api/signup", (req, res) => signup(req, res));
server.delete("/api/user/delete", (req, res) => deleteAcc(req, res));
server.post("/api/signout", (req, res) => signout(req, res));
/* -----검색 기능----- */
server.get("/api/search", (req, res) => search(req, res));
/* ----- 캘린더 ----- */
server.get("/api/calendar", auth, (req, res) => calendar(req, res));
/* ----- 게시물 CRUD ----- */
server.get("/api/:category", auth, (req, res) => board.show(req, res)); //전체 GET
server.get("/api/:category/:id", auth, (req, res) => board.detail(req, res)); //게시물 하나 GET
server.get(
  "/api/:category/:id/image/:image",
  auth,
  (
    req,
    res //게시물의 image GET
  ) => board.showImage(req, res)
);
server.post("/api/:category", auth, (req, res) => board.create(req, res)); //게시물 POST
server.post(
  //게시물의 1개의 이미지 POST
  "/api/:category/upload/:id",
  auth,
  imageParser,
  upload.single("img"),
  (req, res) => board.upload(req, res)
);
server.post(
  //게시물의 여러개의 이미지 POST
  "/api/:category/upload/multi/:id",
  auth,
  imageParser,
  upload.array("img"),
  (req, res) => board.uploads(req, res)
);
server.delete("/api/:category/:id", auth, (req, res) => board.delete(req, res));
server.post("/api/:category/:id", auth, (req, res) => board.update(req, res));
/* ----- 게시물 댓글 CRUD ----- */
server.get("/api/:category/:id/comments", auth, (req, res) =>
  comments.show(req, res)
);
server.post("/api/:category/:id/comments", auth, (req, res) =>
  comments.create(req, res)
);
server.delete("/api/:category/:id/comments/:idx", auth, (req, res) =>
  comments.delete(req, res)
);
server.post("/api/:category/:id/comments/:idx", auth, (req, res) =>
  comments.update(req, res)
);

server.listen(port, host, () => {
  console.log(`Listening on port ${port}`);
});
