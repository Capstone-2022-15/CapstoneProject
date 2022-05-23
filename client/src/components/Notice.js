import "./Notice.css";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Typography } from "@material-ui/core";
import React from "react";

export const Notice = () => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const noticeData = require("./NoticeData.json");
  let song = [];
  for (let i in noticeData) {
    song.push(noticeData[i]);
  }

  song.map((i) => {
    console.log(i.first_name);
  });

  // console.log(noticeData);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table" style={{ textalign: "center" }}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>작성자</TableCell>
              <TableCell>작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {noticeData.noticeData.map(
              (n, index) =>
                (page - 1) * 10 <= index &&
                index < page * 10 && (
                  <TableRow>
                    <TableCell>{n.id}</TableCell>
                    <TableCell>{n.first_name}</TableCell>
                    <TableCell>{n.last_name}</TableCell>
                    <TableCell>{n.email}</TableCell>
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div textalign="center">
        <Stack spacing={2}>
          <Pagination
            count={10}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Stack>
      </div>
    </div>
  );
};
export default Notice;
