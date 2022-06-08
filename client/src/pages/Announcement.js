import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { announcementActions } from "../slices/announcementSlice";

import Header from "../components/HeaderDom";
import Notice from "../components/Notice";

function Announcement() {
  const { announcement, status, statusText } = useSelector(
    (state) => state.announcementReducer
  );

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(announcementActions.getAnnouncement());
  }, [dispatch]);

  return (
    <>
      <Header />
      <h1>공지사항</h1>
      {status === 200 ? (
        <div>
          <ul>
            <Notice outsideJson={announcement} />
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
      <Link to={{ pathname: `/announcement/write` }}>글쓰기</Link>
    </>
  );
}

export default Announcement;
