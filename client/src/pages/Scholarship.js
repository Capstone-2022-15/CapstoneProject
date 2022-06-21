import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scholarshipActions } from "../slices/scholarshipSlice";

import Header from "../components/HeaderDom";
import Notice from "../components/Notice";

function Scholarship() {
  const { scholarship, status, statusText } = useSelector(
    (state) => state.scholarshipReducer
  );

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(scholarshipActions.getScholarship());
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
        학사정보
      </div>
      {status === 200 ? (
        <div>
          <Notice outsideJson={scholarship} name={"scholarship"} />
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
