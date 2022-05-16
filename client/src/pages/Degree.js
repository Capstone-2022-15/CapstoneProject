import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { degreeActions } from "../slices/degreeSlice";

import Header from "../components/HeaderDom";

function Degree() {
  const { degreeList, status, statusText } = useSelector(
    (state) => state.degreeReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(degreeActions.getDegreeList());
  }, [dispatch]);

  return (
    <>
      <Header />
      <h1>학사정보</h1>
      {/* 에러 분기 */}
      {status === 200 ? (
        <div>
          <ul>
            {Object.keys(degreeList).length > 1 ? (
              degreeList.data.map((board) => (
                <li key={board.idx}>
                  <Link to={{ pathname: `/degree/${board.idx}` }}>
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

export default Degree;
