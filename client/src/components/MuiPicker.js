import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Stack } from "@mui/material";

function MuiPicker({ outlineJson }) {
  const [inline, setInline] = useState({
    startdate: null,
    finaldate: null,
  });

  const date = new Date();
  const [startDate, setStartDate] = useState(
    new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  );
  const [endDate, setEndDate] = useState(
    new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
  );

  const handleStartDate = (newValue) => {
    setStartDate(newValue);
    setEndDate(newValue);
  };
  const handleEndDate = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={5} direction="row">
          <DesktopDatePicker
            label="시작일"
            inputFormat="yyyy-MM-dd"
            mask="____-__-__"
            value={startDate}
            onChange={handleStartDate}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: 300 }} />
            )}
          />
          <DesktopDatePicker
            label="마감일"
            inputFormat="yyyy-MM-dd"
            mask="____-__-__"
            value={endDate}
            onChange={handleEndDate}
            renderInput={(params) => (
              <TextField {...params} sx={{ width: 300 }} />
            )}
          />
        </Stack>
      </LocalizationProvider>
    </div>
  );
}

export default MuiPicker;
