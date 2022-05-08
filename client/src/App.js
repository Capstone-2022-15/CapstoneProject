import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import SignUp from "./pages/SignUp";
import Department from "./pages/Department";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";
import FindPw from "./pages/FindPw";

function App() {
  return (
    <Routes>
      <Route path="/profile" element={<Profile />} /** 내 정보 */ />
      <Route path="/community" element={<Community />} /** 커뮤니티 */ />
      <Route path="/department" element={<Department />} /** 학과 정보 */ />
      <Route path="/calendar" element={<Calendar /** 달력 */ />} />
      <Route path="/signup" element={<SignUp />} /** 회원가입 */ />
      <Route path="/FindPw" element={<FindPw />} /** 패스워드 찾기 */ />
      <Route path="/" element={<Login />} /** 메인 화면 : 로그인 */ />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
