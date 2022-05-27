// 나머지 게시판도 성격 비슷하면 재활용 가능할 듯
// 내용물을 개별적으로 출력하려면? state 받아오기 대신 단독 불러오기?
// useLocation 폐기, 단독으로 받아 올 필요 있다

// import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { communityActions } from "../slices/communitySlice";

import Header from "../components/HeaderDom";

function CommunityBoard() {
  // const locationObj = useLocation();
  // const board = locationObj.state;
  // console.log(board);

  const params = useParams();
  const { community, status, statusText } = useSelector(
    (state) => state.communityReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(communityActions.getCommunityBoard(params?.id ?? 0));
  }, [dispatch, params?.id]);

  console.log(params?.id);
  // console.log(params.id);
  // const board = community.data;
  console.log(community.data);

  return (
    <>
      <Header />
      <h1>커뮤니티</h1>
      {status === 200 ? (
        <div>
          {community.data.map((board) => (
            <div key={board.idx}>
              <span>{board.content}</span>
            </div>
          ))}
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

export default CommunityBoard;
