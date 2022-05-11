import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

function RoutesApp() {
  // 지연 로딩
  const Login = lazy(() => import("../pages/Login"));
  const SignUp = lazy(() => import("../pages/SignUp"));
  const FindPw = lazy(() => import("../pages/FindPw"));
  const Main = lazy(() => import("../pages/Main"));
  const Profile = lazy(() => import("../pages/Profile"));
  const Announcement = lazy(() => import("../pages/Announcement"));
  const Degree = lazy(() => import("../pages/Degree"));
  const Scholarship = lazy(() => import("../pages/Scholarship"));
  const Community = lazy(() => import("../pages/Community"));
  const CommunityBoard = lazy(() => import("../pages/CommunityBoard"));
  const NotFound = lazy(() => import("../pages/NotFound"));

  return (
    <div>
      <Suspense
        fallback={<div>Loading...</div> /** 아래를 불러오는 동안 대신 표시 */}
      >
        <Routes>
          <Route path="/" element={<Login />} /** 메인 화면 : 로그인 */ />
          <Route path="/signup" element={<SignUp />} /** 회원가입 */ />
          <Route path="/password" element={<FindPw />} /** 패스워드 찾기 */ />

          <Route path="/main" element={<Main />} /** 달력 */ />
          <Route path="/announcement" element={<Announcement />} />
          <Route path="/degree" element={<Degree />} /** 학사 정보 */ />
          <Route path="/scholarship" element={<Scholarship />} />

          <Route path="/community" element={<Community />} /** 커뮤니티 */ />
          <Route path="/community/:communityId" element={<CommunityBoard />} />

          <Route path="/profile" element={<Profile />} /** 내 정보 */ />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default RoutesApp;
