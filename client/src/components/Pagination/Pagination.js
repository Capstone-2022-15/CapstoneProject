import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Typography } from '@material-ui/core';

export default function BasicPagination() {
    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
    };
  return (
      <Stack spacing={2} >
        <Typography>Page: {page}</Typography>
        <Pagination count={10} page={page} onChange={handleChange} color = "primary" />
      </Stack>
    // <Stack spacing={2}>
    //   <Pagination count={10} color="primary" />
    // </Stack>
  );
}