import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
      <div
        style={{
          fontSize: "2rem",
          marginTop: "40px",
          marginLeft: "100px",
          fontWeight: "bold",
          color: "#3f51b5",
        }}
      >
        공지사항
      </div>
      {status === 200 ? (
        <div>
          <Notice outsideJson={announcement} name={"announcement"} />
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
