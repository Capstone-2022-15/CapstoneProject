import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { signInActions } from "../slices/signInSlice";
import InputBox from "../components/InputBoxDom";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@material-ui/core/Box";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 하나라도 비지 않게 제한하는 방법?
  const [inline, setInline] = useState({
    id: null,
    password: null,
    name: null,
    nick: null,
    gender: null,
  });
  const [viewContent, setViewContent] = useState(() => []);

  const getValue = (e) => {
    const { name, value } = e.target;
    setInline({
      ...inline,
      [name]: value,
    });
  };

  const changeGender0 = () => {
    setInline({ ...inline, gender: 0 });
  };
  const changeGender1 = () => {
    setInline({ ...inline, gender: 1 });
  };

  // 성별 교체 시 늦는 이유? -> 외부 useEffect로 갱신
  useEffect(() => {
    setViewContent({ ...inline });
  }, [inline]);
  console.log(viewContent);

  const onSubmitHandler = () => {
    // history.replaceState({}, null, location.pathname);
    setTimeout(() => navigate("/", { replace: true }), 100);
    dispatch(signInActions.signUpRequest(viewContent));
  };

  return (
    <div>
      <div>회원가입</div>
      <form onSubmit={onSubmitHandler}>
        <TextField
          margin="normal"
          label="아이디"
          required
          fullWidth
          name="id"
          autoComplete="id"
          autoFocus
          onChange={getValue}
        />
        <TextField
          margin="normal"
          label="비밀번호"
          type="password"
          required
          fullWidth
          name="password"
          autoComplete="password"
          onChange={getValue}
        />
        <TextField
          margin="normal"
          label="이름"
          required
          fullWidth
          name="name"
          autoComplete="name"
          onChange={getValue}
        />
        <TextField
          margin="normal"
          label="닉네임"
          required
          fullWidth
          name="nick"
          autoComplete="nick"
          onChange={getValue}
        />
        <input
          type="radio"
          name="gender"
          value="0"
          onChange={changeGender0}
          required
        />
        {"남"}
        <input type="radio" name="gender" value="1" onChange={changeGender1} />
        {"여"}
        <Grid container>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              확인
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default SignUp;
