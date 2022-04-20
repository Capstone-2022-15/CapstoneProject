import React from "react";
import { Link } from "react-router-dom";
import "../css/Header.module.css";

function Header() {
  return (
    <div className="header">
      <strong>Header</strong>
      <ul>
        <li>
          <Link to={`/calendar`} class="item">
            캘린더
          </Link>
        </li>
        <li>
          <Link to={`/department`} class="item">
            장학정보
          </Link>
        </li>
        <li>
          <Link to={`/community`} class="item">
            커뮤니티
          </Link>
        </li>
        <li>
          <Link to={`/profile`} class="item">
            내 정보
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Header;
