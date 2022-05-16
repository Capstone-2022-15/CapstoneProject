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
  const AnnouncementBoard = lazy(() => import("../pages/AnnouncementBoard"));
  const Degree = lazy(() => import("../pages/Degree"));
  const DegreeBoard = lazy(() => import("../pages/DegreeBoard"));
  const Scholarship = lazy(() => import("../pages/Scholarship"));
  const ScholarshipBoard = lazy(() => import("../pages/ScholarshipBoard"));
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
          <Route exact path="/signup" element={<SignUp />} /** 회원가입 */ />
          <Route
            exact
            path="/password"
            element={<FindPw />} /** 패스워드 찾기 */
          />

          <Route exact path="/main" element={<Main />} /** 달력 */ />

          <Route
            exact
            path="/announcement"
            element={<Announcement />} /** 공지사항 */
          />
          <Route
            exact
            path="/announcement/:id"
            element={<AnnouncementBoard />}
          />

          <Route exact path="/degree" element={<Degree />} /** 학사정보 */ />
          <Route exact path="/degree/:id" element={<DegreeBoard />} />

          <Route
            exact
            path="/scholarship"
            element={<Scholarship />} /** 장학정보 */
          />
          <Route exact path="/scholarship/:id" element={<ScholarshipBoard />} />

          <Route
            exact
            path="/community"
            element={<Community />} /** 커뮤니티 */
          />
          <Route exact path="/community/:id" element={<CommunityBoard />} />

          <Route exact path="/profile" element={<Profile />} /** 내 정보 */ />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default RoutesApp;
