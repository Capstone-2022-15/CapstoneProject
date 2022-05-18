import React, { useState } from "react";
// import InputBox from "../components/InputBoxDom";
import ModalDom from "../components/ModalDom";
import { Link } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const [isModalOn, setIsModalOn] = useState(false);

  const openModal = () => {
    setIsModalOn(true);
  };
  const closeModal = () => {
    setIsModalOn(false);
  };

  return (
    <div className="AppDimmer">
      <div className="App">
        <div className="title">로그인 페이지</div>
        <button className="loginBtn" onClick={openModal}>
          로그인
        </button>
        {isModalOn && (
          <ModalDom
            isModalDimmer={isModalOn ? openModal : closeModal}
            handleModal={closeModal}
            link="/main"
          />
        )}
        <button>비밀번호 찾기</button>
        <button>회원가입</button>
      </div>
    </div>
  );
}

export default Login;
