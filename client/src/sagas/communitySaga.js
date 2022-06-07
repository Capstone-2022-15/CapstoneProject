/**
 * take: 액션 dispatch시 제너레이터 next하기
 * put: 특정 액션 dispatch (액션 객체)
 * takeEvery: 모든 액션 처리
 * takeLatest: 가장 마지막 dispatch된 액션 처리
 * all: 여러 사가 합치기
 * call: 함수 동기적 실행 (함수, 넣을 인수)
 * fork: 함수 비동기적 실행
 */
// Query String 이란, 사용자가 입력 데이터를 전달하는 방법 중의 하나로서 URL 주소에 미리 협의된 데이터를 파라미터를 통해 넘기는 것을 말합니다.
// -> 근데 api 링크 형식 때문에 못 쓸거 같음

import axios from "../utils/axios";
import { all, call, fork, put, take } from "redux-saga/effects";
import { communityActions } from "../slices/communitySlice";

const token = window.localStorage.getItem("accessToken");

// `api/community/${qs.stringify(params).replace(/[^0-9]/g, "")}`

//----------------------------------------------------------
// 커뮤니티 첫 화면
function apiGetCommunityAccess() {
  // 이걸로 표를 출력, 재발급하면 표 대신 토큰을 뱉는 이유?
  const access = axios.get(`api/community`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiGetCommunity() {
  axios
    .get(`api/community`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      // 실 데이터 받는 부분, 새 토큰 리프레시
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiGetCommunityAccess();
        // axios
        //   .get(`api/community`, {
        //     headers: {
        //       Authorization: token,
        //     },
        //   })
        //   .then((res1) => {
        //     return res1.data;
        //   });
      }
      console.log("res.data: ", res.data);
      return res.data;
    });
}

// 커뮤니티 세부
function apiGetCommunityBoardAccess(params) {
  const access = axios.get(`api/community/${params}`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiGetCommunityBoard(params) {
  axios
    .get(`api/community/${params}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiGetCommunityBoardAccess(params);
      }
      return res.data;
    });
}

// 커뮤니티 댓글 호출
function apiGetCommunityCommentsAccess(params) {
  const access = axios.get(`api/community/${params}/comments`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiGetCommunityComments(params) {
  axios
    .get(`api/community/${params}/comments`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log(res);
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiGetCommunityCommentsAccess(params);
      }
      return res.data;
    });
}

// 글 작성
function apiPostCommunityWriteAccess(req) {
  const access = axios.post(`api/community`, req, {
    headers: {
      Authorization: token,
    },
  });
  console.log(access);
  return access;
}
function apiPostCommunityWrite(req) {
  axios
    .post(`api/community`, {
      data: req,
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiPostCommunityWriteAccess(req);
      }
      console.log(res.data);
      return res.data;
    });
}

//-------------------------------------------
function* asyncGetCommunity() {
  try {
    const response = yield call(apiGetCommunityAccess);
    yield call(apiGetCommunity);
    console.log("response: ", response);
    console.log("response?.status: ", response?.status);
    if (response?.status === 200) {
      yield put(communityActions.getCommunitySuccess(response));
      if (response.data.token)
        setTimeout(() => window.location.reload(true), 800); // 토큰 발생 시 서버에서 새로고침
    } else {
      yield put(communityActions.getCommunityFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(communityActions.getCommunityFailure(e.response));
  }
}

function* asyncGetCommunityBoard(action) {
  try {
    const response = yield call(apiGetCommunityBoardAccess, action.payload.id);
    yield call(apiGetCommunityBoard, action.payload.id);
    console.log("action.payload: ", action.payload);
    console.log("response: ", response);
    if (response?.status === 200) {
      yield put(communityActions.getCommunityBoardSuccess(response));
      if (response.data.token)
        setTimeout(() => window.location.reload(true), 800);
    } else {
      yield put(communityActions.getCommunityBoardFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(communityActions.getCommunityBoardFailure(e.response));
  }
}

function* asyncGetCommunityComments(action) {
  try {
    const response = yield call(
      apiGetCommunityCommentsAccess,
      action.payload.id
    );
    yield call(apiGetCommunityComments, action.payload.id);
    if (response?.status === 200) {
      yield put(communityActions.getCommunityCommentsSuccess(response));
    } else {
      yield put(communityActions.getCommunityCommentsFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(communityActions.getCommunityCommentsFailure(e.response));
  }
}

function* asyncPostCommunityWrite(action) {
  try {
    const response = yield call(apiPostCommunityWriteAccess, {
      ...action.payload,
    });
    yield call(apiPostCommunityWrite, { ...action.payload });
    console.log("response: ", response);
    if (response?.status === 200) {
      yield put(communityActions.postCommunityWriteSuccess(response));
    } else {
      console.log("A");
      yield put(communityActions.postCommunityWriteFailure(response));
      yield alert(`등록 실패: ${response?.status}, ${response?.statusText}`);
    }
  } catch (e) {
    console.log("B");
    console.error(e);
    yield put(communityActions.postCommunityWriteFailure(e.response));
    yield alert(
      `등록 실패: ${e?.response?.status}, ${e?.response?.statusText}`
    );
  }
}

//---------------------------------------------------------------------
function* watchGetCommunity() {
  while (true) {
    const action = yield take(communityActions.getCommunity);
    yield call(asyncGetCommunity, action);
  }
}

function* watchGetCommunityBoard() {
  while (true) {
    const action = yield take(communityActions.getCommunityBoard);
    yield call(asyncGetCommunityBoard, action);
  }
}

function* watchGetCommunityComments() {
  while (true) {
    const action = yield take(communityActions.getCommunityComments);
    yield call(asyncGetCommunityComments, action);
  }
}

function* watchPostCommunityWrite() {
  while (true) {
    const action = yield take(communityActions.postCommunityWrite);
    yield call(asyncPostCommunityWrite, action);
  }
}

//------------------------------------------------------
export default function* communitySaga() {
  yield all([
    fork(watchGetCommunity),
    fork(watchGetCommunityBoard),
    fork(watchGetCommunityComments),
    fork(watchPostCommunityWrite),
  ]);
}
