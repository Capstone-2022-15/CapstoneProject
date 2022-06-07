import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInActions } from "../slices/signInSlice";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@material-ui/core/Box";

function Login() {
  // const [isModalOn, setIsModalOn] = useState(false);

  // const openModal = () => {
  //   setIsModalOn(true);
  // };
  // const closeModal = () => {
  //   setIsModalOn(false);
  // };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault(); // page refresh를 막아준다

    let body = {
      id: id,
      password: password,
    };

    setTimeout(() => navigate("/main", { replace: true }), 100); // 맘엔 안 들지만 리다이렉트는 이게 한계인 듯, 로딩 길어지면 같이 늘릴 것
    dispatch(signInActions.signInRequest(body)); // 연속으로 실행시키는 방법? payload{id,pw}와 type{signin/signInRequest}
  };

  return (
    // <div className="AppDimmer">
    //   <div className="App">
    //     <div className="title">로그인 페이지</div>
    //     <button className="loginBtn" onClick={openModal}>
    //       로그인
    //     </button>
    //     {isModalOn && (
    //       <ModalDom
    //         isModalDimmer={isModalOn ? openModal : closeModal}
    //         handleModal={closeModal}
    //         link="/main"
    //       />
    //     )}
    //     <button>비밀번호 찾기</button>
    //     <button>회원가입</button>
    //   </div>
    // </div>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" color="Primary">
          제주대학교 학과 게시판
        </Typography>

        <form onSubmit={onSubmitHandler}>
          <TextField
            margin="normal"
            label="아이디"
            required
            fullWidth
            name="id"
            autoComplete="id"
            autoFocus
            onChange={onIdHandler}
          />
          <TextField
            margin="normal"
            label="비밀번호"
            type="password"
            required
            fullWidth
            name="password"
            autoComplete="current-password"
            onChange={onPasswordHandler}
          />
          <Grid container>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                로그인
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/password">비밀번호 찾기</Link>
                </Grid>

                <Grid item>
                  <Link to="/signup">회원가입</Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}

export default Login;
