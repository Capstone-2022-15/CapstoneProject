import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { announcementActions } from "../slices/announcementSlice";

import Header from "../components/HeaderDom";
// import useDidMountEffect from "../components/useDidMountEffect";
import "../css/CKEditer.css";

function Announcement() {
  const [inline, setInline] = useState({
    subject: "",
    content: "",
    writer: "aaa",
    writer_nick: null,
    startdate: null,
    finaldate: null,
    password: null,
  });
  const [viewContent, setViewContent] = useState(() => []);

  const getValue = (e) => {
    const { name, value } = e.target;
    setInline({
      ...inline,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmitHandler = () => {
    dispatch(announcementActions.postAnnouncementWrite(viewContent));
    setTimeout(() => navigate("/announcement", { replace: true }), 300);
  };

  useEffect(() => {
    setViewContent({ ...inline });
  }, [inline]);
  console.log("viewContent: ", viewContent);

  // useEffect(() => {
  //   dispatch(announcementActions.postAnnouncementWrite(viewContent));
  // }, [dispatch, viewContent]);

  return (
    <>
      <Header />
      <h1>커뮤니티</h1>
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
            // You can store the "editor" and use when it is needed.
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
          // onBlur={(event, editor) => {
          //   console.log("Blur.", editor);
          // }}
          // onFocus={(event, editor) => {
          //   console.log("Focus.", editor);
          // }}
        />
        <button className="submit-button" onClick={onSubmitHandler}>
          등록
        </button>
      </div>
    </>
  );
}

export default Announcement;
