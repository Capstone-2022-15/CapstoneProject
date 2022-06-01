import React from 'react';
import Button from '@material-ui/core/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import GroupsIcon from '@mui/icons-material/Groups';
import { useLocation } from "react-router-dom";
import EventNoteIcon from '@mui/icons-material/EventNote';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SchoolIcon from '@mui/icons-material/School';


const Home = () => {

    const GotoNotice = () =>{
        const location =useLocation();
        console.log(location);
        console.log('시발 된다!!');
    }
    
    return(
        <div>
            <Box style={{marginLeft:"560px", marginTop:"150px"}}>
            <Stack spacing={1}>
            <h1 style={{color:"#3f51b5", marginBottom:"30px" ,marginLeft:"40px"}}><b>제주대학교 학과 게시판</b></h1>

                <Stack direction="row" spacing={1}>
                    <Button 
                    style={{
                        backgroundColor: "#3f51b5",
                        color:"#fff	",
                        fontSize: "25px",
                        width: '200px', 
                        height: '200px'
                        }}
                    varint = "contained"
                    href="/TopNav/Notice">
                        <Stack style={{alignItems:"center"}}>
                                <EventNoteIcon color="inherit" fontSize="large" />
                                공지사항
                        </Stack>
                    </Button>
                    <Button
                    style={{
                        backgroundColor: "#3f51b5",
                        color:"#fff	",
                        fontSize: "25px",
                        width: '200px', 
                        height: '200px'
                        }}
                    varint = "contained"
                    href="/TopNav/Schedule">
                        <Stack style={{alignItems:"center"}}>
                                <CalendarMonthIcon color="inherit" fontSize="large" />
                                학사일정
                        </Stack> 
                    </Button>
              </Stack>
                <Stack direction="row" spacing={1}>
                    <Button  style={{
                        backgroundColor: "#3f51b5",
                        color:"#fff	",
                        fontSize: "25px",
                        width: '200px', 
                        height: '200px'
                        }}
                    varint = "contained"
                    href="/TopNav/Scholarship">
                        <Stack style={{alignItems:"center"}}>
                                <SchoolIcon color="inherit" fontSize="large" />
                                장학정보
                        </Stack>
                    </Button>
                    <Button style={{
                        backgroundColor: "#3f51b5",
                        color:"#fff	",
                        fontSize: "25px",
                        width: '200px', 
                        height: '200px'
                        }}
                    varint = "contained"
                    href="/TopNav/Community"
                    >
                        <Stack style={{alignItems:"center"}}>
                            <GroupsIcon color="inherit" fontSize="large" />
                            커뮤니티
                        </Stack>

                    </Button>
                </Stack>
            </Stack>
            </Box>
        </div>
    )
}

export default Home;