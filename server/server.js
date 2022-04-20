const express = require("express");
//Cross-Origin Resource Sharing, 서버와 클라의 통신을 위한 모듈
const cors = require("cors");
const port = process.env.PORT || 3030;
const app = express();
app.use(cors());

//공지사항 모듈
const announcement = require("./announcement");

/* -----공지사항----- */
app.get("/api/announcement", announcement.show);
app.post("/api/customers", function (req, res) {
  announcement.create;
});
app.delete("/api/customers/:id", announcement.delete);
app.post("/api/customers/:id", function (req, res) {
  announcement.update;
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});