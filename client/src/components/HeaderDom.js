import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../css/HeaderDom.module.css";

function HeaderDom() {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <StyledLink to={`/calendar`}>캘린더</StyledLink>
          </li>
          <li>
            <StyledLink to={`/department`}>장학정보</StyledLink>
          </li>
          <li>
            <StyledLink to={`/community`}>커뮤니티</StyledLink>
          </li>
          <li>
            <StyledLink to={`/profile`}>내 정보</StyledLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderDom;

const StyledLink = styled(Link)`
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap");
  font-family: "Noto Sans KR", sans-serif;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color: #ffffff;
  text-align: center;
  padding: 0px 33px;
  text-decoration-line: none;
  &:hover {
    color: #000000;
    font-weight: normal;
  }
`;
