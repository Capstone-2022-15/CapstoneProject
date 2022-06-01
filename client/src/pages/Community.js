import axios from "axios";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { communityActions } from "../slices/communitySlice";

import Header from "../components/HeaderDom";
import Notice from "../components/Notice";

function Community() {
  const { community, status, statusText } = useSelector(
    (state) => state.communityReducer
  );
  console.log("community: ", community);
  console.log("status: ", status);
  console.log("statusText: ", statusText);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(communityActions.getCommunity());
  }, [dispatch]);

  return (
    <>
      <Header />
      <h1>커뮤니티</h1>
      {status === 200 ? (
        <div>
          <Notice outsideJson={community} />
          {/* <ul>
            {Object.keys(communityList).length > 1 ? (
              communityList &&
              communityList.data.map((board) => (
                <li key={board.idx}>
                  <Link
                    to={{
                      pathname: `/community/${board.idx}`,
                    }}
                    // state={{
                    //   id: board.idx,
                    //   subject: board.subject,
                    //   content: board.content,
                    //   writer: board.writer,
                    //   createDate: board.createDate,
                    //   updateDate: board.updateDate,
                    //   hit: board.hit,
                    // }}
                  >
                    <span>{board.subject}</span>
                  </Link>
                </li>
              ))
            ) : (
              <div> 게시판이 없습니다. </div>
            )}
          </ul>
          <Link to={{ pathname: `/community/write` }}>글쓰기</Link> */}
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
      <Link to={{ pathname: `/community/write` }}>글쓰기</Link>
    </>
  );
}

export default Community;
