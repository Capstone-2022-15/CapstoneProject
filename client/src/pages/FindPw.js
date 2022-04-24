import React from "react";
import InputBox from "../components/InputBoxDom";

function FindPw() {
  return (
    <div>
      <div>비밀번호 찾기</div>
      <InputBox name="이름" id="name" type="text" />
      <InputBox name="학번" id="number" type="text" />
      <InputBox name="이메일" id="email" type="text" />
      <button>로그인</button>
    </div>
  );
}

export default FindPw;
