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
  const params = useParams();
  const { communityBoard, status, statusText, param } = useSelector(
    (state) => state.communityReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    const take = dispatch(communityActions.getCommunityBoard(params));
    console.log(take);
  }, [dispatch, params]);

  console.log(communityBoard.data);
  console.log(param);

  const board = communityBoard.data;

  return (
    <>
      <Header />
      <h1>커뮤니티</h1>
      {status === 200 ? (
        <div>
          <div key={board.idx}>
            <h2>{board.subject}</h2>
            <hr />
            <span>{board.content}</span>
          </div>
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
