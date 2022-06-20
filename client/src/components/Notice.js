import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

// 파라미터 추가시키기
export const Notice = ({ outsideJson, name }) => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const [noticeData, setNoticeData] = useState({ data: {}, status: 0 });
  useEffect(() => {
    let timer = setTimeout(() => setNoticeData(outsideJson), 200);
    return () => {
      clearTimeout(timer);
    };
  }, [outsideJson]);
  console.log("noticeData: ", noticeData);

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
            {noticeData.data.length >= 1 ? (
              noticeData &&
              noticeData.data.map(
                (board, index) =>
                  (page - 1) * 10 <= index &&
                  index < page * 10 && (
                    <TableRow key={board.idx}>
                      <TableCell>{board.idx}</TableCell>
                      <TableCell>
                        <Link
                          to={{
                            pathname: `/${name}/${board.idx}`,
                          }}
                        >
                          {board.subject}
                        </Link>
                      </TableCell>
                      <TableCell>{board.writer}</TableCell>
                      <TableCell>{board.createDate}</TableCell>
                    </TableRow>
                  )
              )
            ) : (
              <TableRow>
                <TableCell>게시판이 없습니다.</TableCell>
              </TableRow>
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
