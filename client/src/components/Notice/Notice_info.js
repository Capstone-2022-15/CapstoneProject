import { Table, TableBody, TableCell, TableContainer, TableRow, Paper, TextField } from '@material-ui/core';
import React from 'react';
import qs from 'qs';
import { useLocation } from "react-router-dom";

const Notice_info = () => {
    const noticeData = require('./NoticeData.json');
    const location =useLocation();
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });
      const page = query.page

   
        return(
        <div>
            <TableContainer component ={Paper} elevation={3}  style={{width: 1050, margin: '60px auto', height: 1200}}>
                <div id="wrapper">
                <Table  aria-label="customzied-table" >
                    <TableRow>
                        <TableCell
                        component = "th" align='center' style={{backgroundColor:'#3f51b5', color:'white', fontSize:20, width: 100}}
                        >
                            제목
                        </TableCell>

                        <TableCell align="center" style={{fontSize:18}}>
                            {noticeData.noticeData[page].title}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell component = "th" align='center' style={{backgroundColor:'#3f51b5', color:'white', fontSize:20, width: 100}}
                       >
                            작성자
                        </TableCell>
                        <TableCell align="center" style={{fontSize:18}}>{noticeData.noticeData[page].writer}</TableCell>
                        <TableCell
                        component = "th" align='center' style={{backgroundColor:'#3f51b5', color:'white', fontSize:20, width: 100}}>
                            날짜
                        </TableCell>
                        <TableCell align="center" style={{fontSize:18}}>{noticeData.noticeData[page].date}</TableCell>
                    </TableRow>
                    
                </Table>
                </div>

            {/* 이 부분에 작성한 글 내용 받아온 값 넣어주기 */}
            {noticeData.noticeData[page].content}
            </TableContainer>
        </div>
        );
}


export default Notice_info;
