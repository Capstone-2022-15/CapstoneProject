import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { scholarshipActions } from "../slices/scholarshipSlice";

import Header from "../components/HeaderDom";
import Notice from "../components/Notice";

function Scholarship() {
  const { scholarship, status, statusText } = useSelector(
    (state) => state.scholarshipReducer
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(scholarshipActions.getScholarship());
  }, [dispatch]);

  return (
    <>
      <Header />
      <h1>학사정보</h1>
      {/* 에러 분기 */}
      {status === 200 ? (
        <div>
          <Notice outsideJson={scholarship} />
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
      <Link to={{ pathname: `/scholarship/write` }}>글쓰기</Link>
    </>
  );
}

export default Scholarship;
