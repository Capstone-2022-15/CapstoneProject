import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import icon from "../img/Button-X.png"; // 이미지 직접 루트 말고 임포트해서 건네기
import "../css/ModalDom.css";

function ModalDom({ isModalDimmer, handleModal }) {
  return (
    <div className="modalDimmer" onClick={isModalDimmer}>
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={handleModal}>
          <img src={icon} alt="Button-X" />
        </button>
        <div className="mui">
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField id="email" label="Enter the Email" variant="outlined" />
            <TextField
              id="password"
              label="Enter the Password"
              variant="outlined"
            />
          </Box>
          <Button variant="outlined" color="secondary">
            로그인
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ModalDom;
