import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { communityActions } from "../slices/communitySlice";

import Header from "../components/HeaderDom";

function Community() {
  const { communityList, status, statusText } = useSelector(
    (state) => state.communityReducer
  );
  console.log(communityList);
  console.log(status);
  console.log(statusText);

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => dispatch(communityActions.getCommunityList()), 200);
  }, [dispatch]);

  return (
    <>
      <Header />
      <h1>커뮤니티</h1>
      {/* 에러 분기 */}
      {status === 200 ? (
        <div>
          <ul>
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
          <Link to={{ pathname: `/community/write` }}>글쓰기</Link>
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
