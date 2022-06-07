// import React, { useState } from "react";
// import { useEffect, useDispatch, useSelector } from "react-redux";
// import { Link, useHistory } from "react-router-dom";
// import { signInActions } from "../slices/signInSlice";

// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import icon from "../img/Button-X.png"; // 이미지 직접 루트 말고 임포트해서 건네기
// import "../css/ModalDom.css";

// function ModalDom({ isModalDimmer, handleModal, link }) {
//   // const [userId, setUserId] = useState("");
//   // const [password, setPassword] = useState("");

//   // const { loading, payload } = useSelector((state) => state.signInReducer);

//   // const dispatch = useDispatch();
//   // useEffect(() => {
//   //   dispatch(signInActions.signInRequest());
//   // }, [dispatch]);

//   // const $btn = document.querySelector("#btn");
//   // const $id = document.querySelector("#id");
//   // const $pw = document.querySelector("#password");
//   // $btn.addEventListener("click", (e) => {});

//   return (
//     <div className="modalDimmer" onClick={isModalDimmer}>
//       <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
//         <button type="button" onClick={handleModal}>
//           <img src={icon} alt="Button-X" />
//         </button>
//         <div className="mui">
//           <Box
//             component="form"
//             sx={{
//               "& > :not(style)": { m: 1, width: "25ch" },
//             }}
//             noValidate
//             autoComplete="off"
//           >
//             <TextField
//               id="id"
//               label="Enter the id"
//               variant="outlined"
//               // onChange={(e) => setUserId(e.target.value)}
//             />
//             <TextField
//               id="password"
//               label="Enter the Password"
//               variant="outlined"
//               // onChange={(e) => setPassword(e.target.value)}
//             />
//           </Box>
//           <Button id="btn" variant="outlined" color="secondary">
//             <Link to={link} className="link">
//               로그인
//             </Link>
//             {/* 로그인 */}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ModalDom;
