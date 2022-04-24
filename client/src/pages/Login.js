import React, { useState } from "react";
import InputBox from "../components/InputBoxDom";
import ModalDom from "../components/ModalDom";
import { Link } from "react-router-dom";

function Login() {
  const [isModalOn, setIsModalOn] = useState(false);

  const openModal = () => {
    setIsModalOn(true);
  };
  const closeModal = () => {
    setIsModalOn(false);
  };

  return (
    <div className="App">
      <h1>로그인 페이지</h1>
      <div>
        <button className="loginBtn" onClick={openModal}>
          로그인
        </button>
        {isModalOn && (
          <ModalDom
            isModalDimmer={isModalOn ? openModal : closeModal}
            handleModal={closeModal}
          />
        )}
      </div>
      <button>비밀번호 찾기</button>
      <button>회원가입</button>
    </div>
  );
}

export default Login;
