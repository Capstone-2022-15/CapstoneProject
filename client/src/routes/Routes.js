import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../helpers/PrivateRoutes";
import PublicRoutes from "../helpers/PublicRoutes";

import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import FindPw from "../pages/FindPw";
import Main from "../pages/Main";
import Profile from "../pages/Profile";
import Announcement from "../pages/Announcement";
import AnnouncementBoard from "../pages/AnnouncementBoard";
import AnnouncementWrite from "../pages/AnnouncementWrite";
import Degree from "../pages/Degree";
import Scholarship from "../pages/Scholarship";
import ScholarshipBoard from "../pages/ScholarshipBoard";
import ScholarshipWrite from "../pages/ScholarshipWrite";
import Community from "../pages/Community";
import CommunityBoard from "../pages/CommunityBoard";
import CommunityWrite from "../pages/CommunityWrite";
import Search from "../pages/Search";
import NotFound from "../pages/NotFound";

function RoutesApp() {
  // 지연 로딩
  // const Login = lazy(() => import("../pages/Login"));
  // const SignUp = lazy(() => import("../pages/SignUp"));
  // const FindPw = lazy(() => import("../pages/FindPw"));

  // const Main = lazy(() => import("../pages/Main"));
  // const Profile = lazy(() => import("../pages/Profile"));

  // const Announcement = lazy(() => import("../pages/Announcement"));
  // const AnnouncementBoard = lazy(() => import("../pages/AnnouncementBoard"));
  // const AnnouncementWrite = lazy(() => import("../pages/AnnouncementWrite"));

  // const Degree = lazy(() => import("../pages/Degree"));
  // // const DegreeBoard = lazy(() => import("../pages/DegreeBoard"));

  // const Scholarship = lazy(() => import("../pages/Scholarship"));
  // const ScholarshipBoard = lazy(() => import("../pages/ScholarshipBoard"));
  // const ScholarshipWrite = lazy(() => import("../pages/ScholarshipWrite"));

  // const Community = lazy(() => import("../pages/Community"));
  // const CommunityBoard = lazy(() => import("../pages/CommunityBoard"));
  // const CommunityWrite = lazy(() => import("../pages/CommunityWrite"));

  // const NotFound = lazy(() => import("../pages/NotFound"));

  return (
    <div>
      {/* <Suspense
        fallback={<div>Loading...</div>}
      > */}
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
          <Route path="/announcement/write" element={<AnnouncementWrite />} />

          {/* 학사일정 */}
          <Route path="/degree" element={<Degree />} />

          {/* 장학정보 */}
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/scholarship/:id" element={<ScholarshipBoard />} />
          <Route path="/scholarship/write" element={<ScholarshipWrite />} />

          {/* 커뮤니티 */}
          <Route path="/community" element={<Community />} />
          <Route path="/community/:id" element={<CommunityBoard />} />
          <Route path="/community/write" element={<CommunityWrite />} />

          {/* 검색 */}
          <Route path="/search" element={<Search />} />

          {/* 내 정보 */}
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </Suspense> */}
    </div>
  );
}

export default RoutesApp;
