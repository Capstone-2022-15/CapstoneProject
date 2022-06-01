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
import { all, call, fork, put, take, retry } from "redux-saga/effects";
import qs from "query-string";
import { communityActions } from "../slices/communitySlice";

const SECOND = 1000;
const token = window.localStorage.getItem("accessToken");

//----------------------------------------------------------
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
      }
      console.log("res.data: ", res.data);
      return res.data;
    });
}

function apiGetCommunityBoardAccess(params) {
  const access = axios.get(
    `api/community/${qs.stringify(params).replace(/[^0-9]/g, "")}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return access;
}

function apiGetCommunityBoard(params) {
  axios
    .get(`api/community/${qs.stringify(params).replace(/[^0-9]/g, "")}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      console.log(res);
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiGetCommunityBoardAccess(params);
      }
      return res.data;
    });
}

// function apiGetCommunityCommentsAccess(params) {
//   const access = axios.get(
//     `api/community/${qs.stringify(params).replace(/[^0-9]/g, "")}/comments`,
//     {
//       headers: {
//         Authorization: token,
//       },
//     }
//   );
//   return access;
// }

// function apiGetCommunityComments(params) {
//   axios
//     .get(
//       `api/community/${qs.stringify(params).replace(/[^0-9]/g, "")}/comments`,
//       {
//         headers: {
//           Authorization: token,
//         },
//       }
//     )
//     .then((res) => {
//       console.log(res);
//       if (res.data.token) {
//         window.localStorage.setItem("accessToken", res.data.token);
//         return axios.get(
//           `api/community/${qs
//             .stringify(params)
//             .replace(/[^0-9]/g, "")}/comments`,
//           {
//             headers: {
//               Authorization: token,
//             },
//           }
//         );
//       } else {
//         return res.data;
//       }
//     });
// }

function apiPostCommunityWriteAccess(req) {
  const access = axios.post(`api/community`, req, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}

function apiPostCommunityWrite(req) {
  axios
    .post(`api/community`, req, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiPostCommunityWriteAccess(req);
      }
      return res.data;
    });
}

//-------------------------------------------
function* asyncGetCommunity() {
  try {
    const response = yield call(apiGetCommunityAccess);
    const response1 = yield call(apiGetCommunity);
    console.log("response: ", response);
    if (response?.status === 200) {
      yield put(communityActions.getCommunitySuccess(response));
      if (response.data.token) window.location.reload(true); // 토큰 발생 시 서버에서 새로고침
    } else {
      yield put(communityActions.getCommunityFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(communityActions.getCommunityFail(e.response));
  }
}

function* asyncGetCommunityBoard(action) {
  try {
    const response = yield call(apiGetCommunityBoardAccess, action.payload.id);
    const response1 = yield call(apiGetCommunityBoard, action.payload.id);
    console.log("action.payload: ", action.payload);
    console.log("response: ", response);
    if (response?.status === 200) {
      yield put(communityActions.getCommunityBoardSuccess(response));
      if (response.data.token) window.location.reload(true);
    } else {
      yield put(communityActions.getCommunityBoardFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(communityActions.getCommunityBoardFail(e.response));
  }
}

function* asyncPostCommunityWrite(action) {
  try {
    const response = yield call(apiPostCommunityWriteAccess, {
      ...action.payload,
    });
    const response1 = yield call(apiPostCommunityWrite, { ...action.payload });
    console.log("action.payload: ", action.payload);
    if (response?.status === 201) {
      yield put(communityActions.postCommunityWriteSuccess(response));
    } else {
      yield put(communityActions.postCommunityWriteFailure(response));
      yield alert(`등록 실패: ${response?.status}, ${response?.statusText}`);
    }
  } catch (e) {
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

// function* asyncGetCommunityComments() {
//   try {
//     const response = yield call(apiGetCommunityComments);
//     if (response?.status === 200) {
//       yield put(communityActions.getCommunityListSuccess(response));
//     } else {
//       yield put(communityActions.getCommunityListFail(response));
//     }
//   } catch (e) {
//     console.error(e);
//     yield put(communityActions.getCommunityListFail(e.response));
//   }
// }

// function* watchGetCommunityComments() {
//   while (true) {
//     yield take(communityActions.getCommunityList);
//     yield call(asyncGetCommunityComments);
//   }
// }

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
    // fork(watchUpdateCommunityViews),
    fork(watchPostCommunityWrite),
  ]);
}
