import React, { useState, useRef } from "react";
import InputBox from "../components/comp-InputBox";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

function Login() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    if (isModalOpen === true) return setIsModalOpen(false);
  };

  return (
    <div onClick={closeModal}>
      <h1>로그인 페이지</h1>
      <InputBox name="ID" id="id" type="text" />
      <InputBox name="Password" id="pw" type="text" />
      <button>로그인</button>
      <button onClick={openModal}>비밀번호 찾기</button>
      {isModalOpen && <Modal message="modal"></Modal>}
      <button>회원가입</button>
    </div>
  );
}

export default Login;
