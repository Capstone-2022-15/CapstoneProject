const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport'); //passport 모듈 연결

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const { sequelize } = require('./models'); //데이터베이스 생성 후 모델과 서버 연결
const passportConfig = require('./passport'); //passport 모듈

const server = express();
passportConfig(); // 패스포트 설정
server.set('port', process.env.PORT || 8001);
server.set('view engine', 'html');
nunjucks.configure('views', {
  express: server,
  watch: true,
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

server.use(morgan('dev'));
server.use(express.static(path.join(__dirname, 'public')));
server.use('/img', express.static(path.join(__dirname, 'uploads')));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
server.use(passport.initialize());
server.use(passport.session());

server.use('/', pageRouter);
server.use('/auth', authRouter);
server.use('/post', postRouter);
server.use('/user', userRouter);

server.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

server.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

server.listen(server.get('port'), () => {
  console.log(server.get('port'), '번 포트에서 대기중');
});
