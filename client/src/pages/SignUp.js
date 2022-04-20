import React from "react";
import InputBox from "../components/comp-InputBox";

function SignUp() {
  return (
    <div>
      <div>회원가입</div>
      <InputBox name="ID" id="id" type="text" />
      <InputBox name="Password" id="pw" type="text" />
      <button>로그인</button>
    </div>
  );
}

export default SignUp;
