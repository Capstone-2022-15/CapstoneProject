import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { scholarshipActions } from "../slices/scholarshipSlice";

import Header from "../components/HeaderDom";

function Scholarship() {
  const { scholarshipList, status, statusText } = useSelector(
    (state) => state.scholarshipReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(scholarshipActions.getScholarshipList());
  }, [dispatch]);

  return (
    <>
      <Header />
      <h1>학사정보</h1>
      {/* 에러 분기 */}
      {status === 200 ? (
        <div>
          <ul>
            {Object.keys(scholarshipList).length > 1 ? (
              scholarshipList.data.map((board) => (
                <li key={board.idx}>
                  <Link to={{ pathname: `/scholarship/${board.idx}` }}>
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

export default Scholarship;
