import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { scholarshipActions } from "../slices/scholarshipSlice";

import Header from "../components/HeaderDom";
// import useDidMountEffect from "../components/useDidMountEffect";

function ScholarshipBoard() {
  const params = useParams();
  const { scholarshipBoard, scholarshipComments, status, statusText } =
    useSelector((state) => state.scholarshipReducer);

  const dispatch = useDispatch();
  useLayoutEffect(() => {
    const take = dispatch(scholarshipActions.getScholarshipBoard(params));
    setTimeout(() => take, 100);
    const take1 = dispatch(scholarshipActions.getScholarshipComments(params));
    setTimeout(() => take1, 200);
    console.log(take);
  }, [dispatch, params]);

  // const [inline, setInline] = useState({
  //   member_id: "admin", //작성자 아이디
  //   member_nick: "aaa", //작성자 닉네임, null이어도 됨
  //   content: null, //댓글 내용
  // });
  // const [viewContent, setViewContent] = useState(() => []); // 적힌 내용 저장

  // const getValue = (e) => {
  //   const { name, value } = e.target;
  //   setInline({
  //     ...inline,
  //     [name]: value,
  //   });
  // };

  // const onSubmitHandler = () => {
  //   setViewContent(viewContent.concat({ ...inline }));
  // };

  // useDidMountEffect(() => {
  //   dispatch(scholarshipActions.postScholarshipComments(viewContent));
  // }, [dispatch, viewContent]);

  const board = scholarshipBoard.data;

  return (
    <>
      <Header />
      <h1>커뮤니티</h1>
      {status === 200 && board !== undefined ? (
        <div>
          <div className="inBoard" key={board.idx}>
            <h2>{board.subject}</h2>
            <hr />
            <span>{board.content}</span>
            <hr />
          </div>
          <div className="inComment">
            {scholarshipComments.data &&
            scholarshipComments.data.length >= 1 ? (
              scholarshipComments &&
              scholarshipComments.data.map((comment, index) => (
                <div key={index}>
                  <span>
                    {index + 1} / {comment.member_nick} / {comment.content}
                  </span>
                </div>
              ))
            ) : (
              <div>
                <span>댓글이 없습니다.</span>
              </div>
            )}
          </div>
          <div className="writeComment">
            {/* <form onSubmit={onSubmitHandler}>
              <textarea
                name="content"
                placeholder="댓글을 입력하세요"
                onChange={getValue}
                cols="100"
                rows="5"
              ></textarea>
              <button type="submit">등록</button>
            </form> */}
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

export default ScholarshipBoard;
