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
import { Link, BrowserRouter as Router } from 'react-router-dom';

export const Community =() =>{
  const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
    
  const communityData = require('./Community.json');

    return (
      <div style={{maxWidth: "1200px", margin:"2rem auto", marginTop:"60px"}}>
      <TableContainer component={Paper}>
        <div style={{fontSize:'2rem', marginBottom:"40px", fontWeight:"bold"}}>
          컴퓨터공학과
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
                {communityData.communityData.map((n,index)=>
                (page-1)*10 <= index && index < page*10 &&
                (
                  <TableRow>
                  <TableCell align="center">{n.id}</TableCell>
                  <TableCell >
                    <Link to ="/TopNav/Notice_info" style={{textDecoration:'none'}}>
                     {n.content}
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
      <Pagination count={parseInt(communityData["communityData"].length/10)+1} page={page} onChange={handleChange} color = "primary" />
    </Stack>
    </Box>
  </div>
    )
}
export default Community;
