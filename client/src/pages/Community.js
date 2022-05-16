import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { communityActions } from "../slices/communitySlice";

import Header from "../components/HeaderDom";

function Community() {
  const { communityList, status, statusText } = useSelector(
    (state) => state.communityReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(communityActions.getCommunityList());
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
              communityList.data.map((board) => (
                <li key={board.idx}>
                  {/* CommunityBoard에 상세 내용 넘기기 */}
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
