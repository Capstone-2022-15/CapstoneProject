import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../helpers/PrivateRoutes";
import PublicRoutes from "../helpers/PublicRoutes";

function RoutesApp() {
  // 지연 로딩
  const Login = lazy(() => import("../pages/Login"));
  const SignUp = lazy(() => import("../pages/SignUp"));
  const FindPw = lazy(() => import("../pages/FindPw"));

  const Main = lazy(() => import("../pages/Main"));
  const Profile = lazy(() => import("../pages/Profile"));

  const Announcement = lazy(() => import("../pages/Announcement"));
  const AnnouncementBoard = lazy(() => import("../pages/AnnouncementBoard"));

  const Degree = lazy(() => import("../pages/Degree"));
  const DegreeBoard = lazy(() => import("../pages/DegreeBoard"));

  const Scholarship = lazy(() => import("../pages/Scholarship"));
  const ScholarshipBoard = lazy(() => import("../pages/ScholarshipBoard"));

  const Community = lazy(() => import("../pages/Community"));
  const CommunityBoard = lazy(() => import("../pages/CommunityBoard"));
  const CommunityWrite = lazy(() => import("../pages/CommunityWrite"));

  const NotFound = lazy(() => import("../pages/NotFound"));

  return (
    <div>
      <Suspense
        fallback={<div>Loading...</div> /** 아래를 불러오는 동안 대신 표시 */}
      >
        <Routes>
          <Route path="/" element={<PublicRoutes />}>
            <Route path="/" element={<Login />} /** 첫 화면 : 로그인 */ />
            <Route path="/signup" element={<SignUp />} /** 회원가입 */ />
            <Route path="/password" element={<FindPw />} /** 패스워드 찾기 */ />
          </Route>

          <Route path="/" element={<PrivateRoutes />}>
            {/* 메인 화면 : 달력, 여기로 리다이렉트  */}
            <Route path="/main" element={<Main />} />

            {/* 공지사항  */}
            <Route path="/announcement" element={<Announcement />} />
            <Route path="/announcement/:id" element={<AnnouncementBoard />} />

            {/* 학사정보 */}
            <Route path="/degree" element={<Degree />} />
            <Route path="/degree/:id" element={<DegreeBoard />} />

            {/* 장학정보 */}
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/scholarship/:id" element={<ScholarshipBoard />} />

            {/* 커뮤니티 */}
            <Route path="/community" element={<Community />} />
            <Route path="/community/:id" element={<CommunityBoard />} />
            <Route path="/community/write" element={<CommunityWrite />} />

            {/* 내 정보 */}
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default RoutesApp;
