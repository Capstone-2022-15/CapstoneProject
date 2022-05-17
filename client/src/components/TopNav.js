import  React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Calendar from './Calendar/Calendar';
import Notice from './Notice/Notice';
import { withStyles } from "@material-ui/styles";
import { Paper } from '@material-ui/core';
import { relativeTimeRounding } from 'moment';

const styles = theme => ({
  nav:{
      width: '100%',
      overflowX : "auto" //전체 바깥쪽에 해당하는 root 같은 경우 x쪽으로 오버플로가 발생할 수 있게 처리
  },
  table:{
    minwidth: 1080
  }
})


const ResponsiveAppBar = () =>{
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () =>{
        setAnchorElUser(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const openCalendar = () => {
        document.getElementById("tx").textContent="학사일정";
    };
  
  

    return (
      <div>
        <AppBar position="static">
          <Container maxWidth="xl" >
            <Toolbar >
              <Typography
                variant="h5"
                component="div"
              >
                제주대학교 게시판
              </Typography>
              <Box sx={{ flexGrow: 1,  display: { xs: 'none', md: 'flex' }, justifyContent : 'space-around', }}>
                <Button
                    style={{
                      backgroundColor: "#3f51b5",
                      color:"#fff",
                      fontSize: "18px"
                    }}
                    varint = "contained"
                    onClick={handleCloseNavMenu}
                    >
                  공지사항
                </Button>

                <Button
                    style={{
                      backgroundColor: "#3f51b5",
                      color:"#fff",
                      fontSize: "18px"
                    }}
                    varint = "contained"
                    onClick={openCalendar}
                    >
                  학사일정
                </Button>
                <Button
                    style={{
                      backgroundColor: "#3f51b5",
                      color:"#fff",
                      fontSize: "18px"
                    }}
                    varint = "contained"
                    onClick={handleCloseNavMenu}
                    >
                  장학정보
                </Button>
                <Button
                    style={{
                      backgroundColor: "#3f51b5",
                      color:"#fff",
                      fontSize: "18px"
                    }}
                    varint = "contained"
                    onClick={handleCloseNavMenu}
                    >
                  커뮤니티
                </Button>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        <div >
          <Notice/>
        </div>

        </div>
      );
    };
    export default withStyles(styles)(ResponsiveAppBar);