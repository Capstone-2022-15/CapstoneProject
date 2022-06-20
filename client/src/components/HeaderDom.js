import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signInActions } from "../slices/signInSlice";

import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import LogoutIcon from "@mui/icons-material/Logout";

import styled from "styled-components";
import "../css/HeaderDom.module.css";

// const styles = (theme) => ({
//   nav: {
//     width: "100%",
//     overflowX: "auto", //전체 바깥쪽에 해당하는 root 같은 경우 x쪽으로 오버플로가 발생할 수 있게 처리
//   },
//   table: {
//     minwidth: 1080,
//   },
// });

function HeaderDom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logOut() {
    setTimeout(() => navigate("/", { replace: true }), 100);
    dispatch(signInActions.logOutRequest());
  }

  return (
    <div className="header">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <StyledLink to={`/main`}>
              <Typography variant="h5" component="div">
                제주대학교 게시판
              </Typography>
            </StyledLink>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "space-around",
              }}
            >
              <StyledLink
                to={`/announcement`}
                style={{
                  backgroundColor: "#3f51b5",
                  fontSize: "18px",
                }}
                variant="contained"
              >
                공지사항
              </StyledLink>
              <StyledLink
                to={`/degree`}
                style={{
                  backgroundColor: "#3f51b5",
                  fontSize: "18px",
                }}
                variant="contained"
              >
                학사일정
              </StyledLink>
              <StyledLink
                to={`/scholarship`}
                style={{
                  backgroundColor: "#3f51b5",
                  fontSize: "18px",
                }}
                variant="contained"
              >
                학사정보
              </StyledLink>
              <StyledLink
                to={`/community`}
                style={{
                  backgroundColor: "#3f51b5",
                  fontSize: "18px",
                }}
                variant="contained"
              >
                커뮤니티
              </StyledLink>
              <StyledButton onClick={logOut}>
                <LogoutIcon />
              </StyledButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default HeaderDom;

const StyledLink = styled(Link)`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color: #fff;
  padding: 10px 33px;
  text-decoration-line: none;
  &:hover {
    color: #000000;
    font-weight: normal;
  }
`;

const StyledButton = styled.button`
  text-decoration-line: none;
  background: #3f51b5;
  color: #fff;
  border: 0;
  outline: 0;
  &:hover {
    color: #000000;
    font-weight: normal;
  }
`;
