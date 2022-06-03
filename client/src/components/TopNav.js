import  React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/styles";
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

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
    
    return (
      <div>
        <AppBar position="static">
          <Container maxWidth="xl" >
            <Toolbar >
              <Typography
                variant="h5"
                component="div"
              >
                <Link to="/" style={{textDecoration:'none', background:"#3f51b5", color:"#fff", fontSize:"25px"}}>
                 제주대학교 게시판
                </Link>
              </Typography>
              <Box sx={{ 
                        flexGrow: 1,  
                        display: { xs: 'none', md: 'flex' }, 
                        justifyContent : 'space-around', 
                        }}>
                        <Link to ="/TopNav/Notice" style={{textDecoration:'none'}}>
                            <Button
                                style={{
                                backgroundColor: "#3f51b5",
                                color:"#fff",
                                fontSize: "18px"
                                }}
                                varint = "contained"
                                >
                            공지사항
                            </Button>
                        </Link>
                        <Link to ="/TopNav/Schedule" style={{textDecoration:'none'}}>
                            <Button
                                style={{
                                backgroundColor: "#3f51b5",
                                color:"#fff",
                                fontSize: "18px"
                                }}
                                varint = "contained"
                                >
                            학사일정
                            </Button>
                        </Link>
                        <Link to ="/TopNav/Scholarship" style={{textDecoration:'none'}}>
                            <Button
                                style={{
                                backgroundColor: "#3f51b5",
                                color:"#fff",
                                fontSize: "18px"
                                }}
                                varint = "contained"
                                >
                            장학정보
                            </Button>
                        </Link>
                        <Link to ="/TopNav/Community" style={{textDecoration:'none'}}>
                            <Button
                                style={{
                                backgroundColor: "#3f51b5",
                                color:"#fff",
                                fontSize: "18px"
                                }}
                                varint = "contained"
                                >
                            커뮤니티
                            </Button>
                        </Link>
                    </Box>
                    <Typography
                    variant="h7"
                    component="div"
                    style={{margin:"Left"}}
                    >
                      <Link to ="/" style={{textDecoration:'none', background:"#3f51b5", color:"#fff", fontSize:"25px"}}>
                        <LogoutIcon/>
                      </Link>
                    </Typography>
            </Toolbar>
          </Container>
        </AppBar>


        </div>
      );
    };
    export default withStyles(styles)(ResponsiveAppBar);