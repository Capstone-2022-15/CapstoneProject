import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../slices/searchSlice";

import Header from "../components/HeaderDom";
import NoticeSearch from "../components/NoticeSearch";

function Search() {
  const { search, status, statusText } = useSelector(
    (state) => state.communityReducer
  );

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    dispatch(searchActions.postSearch());
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
        검색
      </div>
      {status === 200 ? (
        <div>
          <NoticeSearch outsideJson={search} name={"search"} />
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

export default Search;
