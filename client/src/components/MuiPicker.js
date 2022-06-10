import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Stack } from '@mui/material';

export default function MuiPicker() {
    const date = new Date();
    const [value, setValue] = React.useState(new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`));

    const handleChange = (newValue) => {
        setValue(newValue);
      };
    
    return (
        <div>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={5} direction="row" >
            <DesktopDatePicker
          label="시작일"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params}
          sx={{ width: 300}}
          />}
        />

            <DesktopDatePicker
          label="마감일"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} 
          sx={{ width: 300}}
          />}
          />
          </Stack>
        </LocalizationProvider>
        
        </div>
  );
}

