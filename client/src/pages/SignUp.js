import React from "react";
import InputBox from "../components/InputBoxDom";

function SignUp() {
  return (
    <div>
      <div>회원가입</div>
      <InputBox name="ID" id="id" type="text" />
      <InputBox name="Password" id="pw" type="text" />
      <InputBox name="이메일" id="email" type="text" />
      <button>확인</button>
    </div>
  );
}

export default SignUp;
