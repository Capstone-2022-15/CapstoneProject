import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { scholarshipActions } from "../slices/scholarshipSlice";

import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Stack } from "@mui/material";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import Header from "../components/HeaderDom";
import "../css/CKEditer.css";

function Scholarship() {
  // 날짜 형식
  const date = new Date();
  function processDate(day) {
    return `${day.getFullYear()}-${("0" + (day.getMonth() + 1)).slice(-2)}-${(
      "0" + day.getDate()
    ).slice(-2)}`;
  }

  // 서버에 전달할 정보 (날짜 필수 작성)
  const [inline, setInline] = useState({
    subject: "",
    content: "",
    writer: "aaa",
    writer_nick: null,
    startdate: processDate(date),
    finaldate: processDate(date),
    password: null,
  });
  const [viewContent, setViewContent] = useState(() => []);

  // 내용 입력 후 변경
  const getValue = (e) => {
    const { name, value } = e.target;
    setInline({
      ...inline,
      [name]: value,
    });
  };

  // 날짜 변경
  const handleStartDate = (day) => {
    setInline({
      ...inline,
      startdate: processDate(day),
    });
  };
  const handleEndDate = (day) => {
    setInline({
      ...inline,
      finaldate:
        inline.startdate <= processDate(day)
          ? processDate(day)
          : inline.startdate,
    });
  };

  // 변경된 내용 전달
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmitHandler = () => {
    dispatch(scholarshipActions.postScholarshipWrite(viewContent));
    setTimeout(() => navigate("/scholarship", { replace: true }), 300);
  };
  useEffect(() => {
    setViewContent({ ...inline });
  }, [inline]);
  console.log("viewContent: ", viewContent);

  return (
    <>
      <Header />
      <h1>학사정보</h1>
      <div className="form-input">
        <input
          className="inside title-input"
          type="text"
          placeholder="제목"
          onChange={getValue}
          name="subject"
        />
        <input
          className="inside pw-input"
          type="password"
          placeholder="입력한 암호는 글 삭제 시 사용됩니다"
          onChange={getValue}
          name="password"
        />
        <CKEditor
          editor={ClassicEditor}
          config={{
            placeholder: "내용을 입력하세요",
            autoParagraph: false,
            enterMode: 2,
            ShiftEnterMode: 1,
          }}
          data=""
          onReady={(editor) => {
            console.log("Editor is ready to use!", editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            console.log({ event, editor, data });
            setInline({
              ...inline,
              content: data,
            });
            console.log(inline);
          }}
        />

        <div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={5} direction="row">
              <DesktopDatePicker
                label="시작일"
                inputFormat="yyyy-MM-dd"
                mask="____-__-__"
                value={inline.startdate}
                onChange={handleStartDate}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: 300 }} />
                )}
              />
              <DesktopDatePicker
                label="마감일"
                inputFormat="yyyy-MM-dd"
                mask="____-__-__"
                value={inline.finaldate}
                onChange={handleEndDate}
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: 300 }} />
                )}
              />
            </Stack>
          </LocalizationProvider>
        </div>

        <button className="submit-button" onClick={onSubmitHandler}>
          등록
        </button>
      </div>
    </>
  );
}

export default Scholarship;
