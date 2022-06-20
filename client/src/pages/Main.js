import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import { signInActions } from "../slices/signInSlice";

import Button from "@material-ui/core/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import GroupsIcon from "@mui/icons-material/Groups";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import { styled } from "@material-ui/core/styles";
import "../css/Home.css";

function Main() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  return (
    <div id="wrap">
      <Box>
        <Stack spacing={1}>
          <div>
            <img
              src="img/Jeju.jpg"
              style={{
                width: "400px",
                marginLeft: "50px",
                marginBottom: "30px",
              }}
              alt="Jeju"
            />
          </div>

          <Stack direction="row" spacing={1}>
            <Link to={`/announcement`} style={{ textDecoration: "none" }}>
              <StyledButton variant="contained">
                <Stack style={{ alignItems: "center" }}>
                  <EventNoteIcon color="inherit" fontSize="large" />
                  공지사항
                </Stack>
              </StyledButton>
            </Link>
            <Link to={`/degree`} style={{ textDecoration: "none" }}>
              <StyledButton variant="contained">
                <Stack style={{ alignItems: "center" }}>
                  <CalendarMonthIcon color="inherit" fontSize="large" />
                  학사일정
                </Stack>
              </StyledButton>
            </Link>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Link to={`/scholarship`} style={{ textDecoration: "none" }}>
              <StyledButton variant="contained">
                <Stack style={{ alignItems: "center" }}>
                  <SchoolIcon color="inherit" fontSize="large" />
                  장학정보
                </Stack>
              </StyledButton>
            </Link>
            <Link to={`/community`} style={{ textDecoration: "none" }}>
              <StyledButton variant="contained">
                <Stack style={{ alignItems: "center" }}>
                  <GroupsIcon color="inherit" fontSize="large" />
                  커뮤니티
                </Stack>
              </StyledButton>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
}

export default Main;

const StyledButton = styled(Button)({
  backgroundColor: "#3f51b5",
  color: "#fff",
  fontSize: "30px",
  width: "250px",
  height: "250px",
});
