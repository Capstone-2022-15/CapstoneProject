import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { styled, alpha } from "@mui/material/styles";

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

  return (
    <div>
      <TableContainer component={Paper}>
        <Search
          style={{
            float: "right",
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="검색어"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Link to={{ pathname: `/search` }} style={{ textDecoration: "none" }}>
          <Button
            style={{
              float: "right",
              backgroundColor: "#3f51b5",
              color: "#fff",
              fontSize: "15px",
              flexDirection: "row",
            }}
            variant="contained"
          >
            검색
          </Button>
        </Link>

        <Table aria-label="simple table" style={{ textalign: "center" }}>
          <TableHead>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">작성자</TableCell>
              <TableCell align="center">작성일</TableCell>
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
                      <TableCell align="center">{board.idx}</TableCell>
                      <TableCell align="center">
                        <Link
                          to={{
                            pathname: `/${name}/${board.idx}`,
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          {board.subject}
                        </Link>
                      </TableCell>
                      <TableCell align="center">{board.writer}</TableCell>
                      <TableCell align="center">
                        {board.createDate.slice(0, -14)}
                      </TableCell>
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
        <Stack
          spacing={2}
          style={{
            marginTop: "40px",
            marginLeft: "10px",
          }}
        >
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

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.dark, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.primary.dark, 0.25),
  },
  marginLeft: 0,
  width: "70%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: "80%",
    width: "18%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
