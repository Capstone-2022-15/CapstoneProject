import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { communityActions } from "../slices/communitySlice";

import Header from "../components/HeaderDom";
import "../css/CKEditer.css";

function Community() {
  const [inline, setInline] = useState({
    subject: "",
    content: "",
    writer: "",
    writer_nick: null,
    startdate: null,
    finaldate: null,
    password: null,
  });
  const [viewContent, setViewContent] = useState([]); // 적힌 내용 저장

  // js는 직접 수정X -> 복사 수정, 형식 비슷하면 광범위한 사용 가능
  const getValue = (e) => {
    const { name, value } = e.target;
    setInline({
      ...inline,
      [name]: value,
    });
    console.log(name.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmitHandler = () => {
    setViewContent(viewContent.concat({ ...inline }));
    dispatch(communityActions.postCommunityWrite(viewContent));
    // navigate("/community");
  };

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
          config={{ placeholder: "내용을 입력하세요" }}
          data="<p></p>"
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
        <button
          type="submit"
          className="submit-button"
          onClick={onSubmitHandler}
        >
          등록
        </button>
      </div>
    </>
  );
}

export default Community;
