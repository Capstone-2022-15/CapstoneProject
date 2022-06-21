import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { communityActions } from "../slices/communitySlice";

import Header from "../components/HeaderDom";
import Notice from "../components/Notice";

function Community() {
  const { community, status, statusText } = useSelector(
    (state) => state.communityReducer
  );

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(communityActions.getCommunity());
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
        커뮤니티
      </div>
      {status === 200 ? (
        <div>
          <Notice outsideJson={community} name={"community"} />
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

export default Community;
