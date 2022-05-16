import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { announcementActions } from "../slices/announcementSlice";

import Header from "../components/HeaderDom";

function Announcement() {
  const { announcementList, status, statusText } = useSelector(
    (state) => state.announcementReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(announcementActions.getAnnouncementList());
  }, [dispatch]);

  return (
    <>
      <Header />
      <h1>공지사항</h1>
      {/* 에러 분기 */}
      {status === 200 ? (
        <div>
          <ul>
            {Object.keys(announcementList).length > 1 ? (
              announcementList.data.map((board) => (
                <li key={board.idx}>
                  <Link to={{ pathname: `/announcement/${board.idx}` }}>
                    <span>{board.subject}</span>
                  </Link>
                </li>
              ))
            ) : (
              <div> 게시판이 없습니다. </div>
            )}
          </ul>
        </div>
      ) : (
        <div>
          <div>
            <span>{status}</span>
          </div>
          <div>
            <span>{statusText}</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Announcement;
