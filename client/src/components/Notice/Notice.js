import "./Notice.css"
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import TableContainer from "@material-ui/core/TableContainer";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import React from "react";
import Box from "@mui/material/Box"
import { Button } from "@material-ui/core";
import { Link, Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from '@material-ui/icons/Search';
import { styled, alpha } from '@mui/material/styles';

export const Notice =() =>{
  const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    
  const noticeData = require('./NoticeData.json');

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.primary.dark, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.dark, 0.25),
    },
    marginLeft: 0,
    width: '70%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: '80%',
      width: '18%',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }))
    return (
      <div style={{maxWidth: "1500px", margin:"2rem auto", marginTop:"60px"}}>
      <TableContainer component={Paper}>
        <div style={{fontSize:'2rem', marginTop:"40px", fontWeight:"bold", color:"#3f51b5", marginLeft:"550px"}}>
          컴퓨터공학과
          공지사항
        <Search >
          <SearchIconWrapper>
            <SearchIcon/>
          </SearchIconWrapper>
          <StyledInputBase
              placeholder="검색어"
              inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
        </div>

          <Table aria-label='simple table'style={{textalign:'center'}} >
              <TableHead>
                  <TableRow>
                      <TableCell align="center">번호</TableCell>
                      <TableCell align="center">제목</TableCell>
                      <TableCell align="center">작성자</TableCell>
                      <TableCell align="center">작성일</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                {noticeData.noticeData.map((n,index)=>
                (page-1)*10 <= index && index < page*10 &&
                (
                  <TableRow>
                  <TableCell align="center">{n.id}</TableCell>
                  <TableCell >
                    <Link to ={`/TopNav/Notice_info?page=${n.id}`} style={{textDecoration:'none'}}>
                     {n.title}
                     </Link>
                    </TableCell>
                    
                  <TableCell align="center">{n.writer}</TableCell>
                  <TableCell align="center">{n.date}</TableCell>
                </TableRow>
                ))}
                            
                    
              </TableBody>

          </Table>
          
      </TableContainer>
     
      <Box justifyContent={"right"} alignItems="center" display={"flex"} 
      sx ={{
        margin: "5px 0px"
      }} >
         
          <Link to ="/TopNav/Write" style={{textDecoration:'none'}}>

            <Button style={{
                          backgroundColor: "#3f51b5",
                          color:"#fff	",
                          fontSize: "15px",
                          flexDirection:'row'

                          }}
                        varint = "contained"
                        >
                          글쓰기
            </Button>
          </Link>
          </Box>      
    <Box justifyContent={"center"} alignItems="center" display={"flex"}
      sx ={{
        margin: "20px 0px"
      }} >
      <Stack spacing={2} >
      <Pagination count={parseInt(noticeData["noticeData"].length/10)+1} page={page} onChange={handleChange} color = "primary" />
    </Stack>
    </Box>
  </div>
    )
}
export default Notice;
