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

function apiGetCommunityAccess() {
  const access = axios.get(`api/community`, {
    headers: {
      Authorization: token,
    },
  });

  return access;
}

function apiGetCommunityList() {
  axios
    .get(`api/community`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      // 실 데이터 받는 부분, 새 토큰 리프레시
      console.log(res);
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        axios.get(`api/community`, {
          headers: {
            Authorization: token,
          },
        });
      }
      return res.data;
    });
}

function apiGetCommunityBoard(params) {
  return axios.get(
    `api/community/${qs.stringify(params).replace(/[^0-9]/g, "")}`
    // {
    //   headers: {
    //     Authorization: window.localStorage.getItem("accessToken"),
    //   },
    // } // 진짜 이 방식 뿐인가? 너무 추하다.
  );
}

// function apiPutCommunity(request) {
//   return axios.put(`api/community/${request?.idx}`, request);
// }

// function apiGetCommunityComments(communityId) {
//   return axios.get(`api/community/${communityId}/comments`);
// }

function* asyncGetCommunityList() {
  try {
    const response = yield call(apiGetCommunityAccess);
    const response1 = yield call(apiGetCommunityList);
    console.log(response);
    console.log(response1);
    if (response?.status === 200) {
      yield put(communityActions.getCommunityListSuccess(response));
    } else {
      yield put(communityActions.getCommunityListFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(communityActions.getCommunityListFail(e.response));
  }
}

function* asyncGetCommunityBoard(action) {
  try {
    const response = yield retry(5, 10 * SECOND, apiGetCommunityBoard, {
      idx: action.payload,
    });
    console.log(response);
    console.log(action.payload);
    if (response?.status === 200) {
      yield put(communityActions.getCommunityBoardSuccess(response));
      // yield put(communityActions.updateCommunityViews(response.data));
    } else {
      yield put(communityActions.getCommunityBoardFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(communityActions.getCommunityBoardFail(e.response));
  }
}

// // 조회수 늘리기
// function* asyncUpdateCommunityViews(action) {
//   try {
//     const response = yield call(apiPutCommunity, {
//       ...action.payload,
//       hit: parseInt(action.payload?.hit ?? 0) + 1,
//       updateDate: Date.now(),
//     });
//     if (response?.status === 200) {
//       yield put(communityActions.updateCommunityViewsSuccess(response));
//     } else {
//       yield put(communityActions.updateCommunityViewsFail(response));
//     }
//   } catch (e) {
//     console.error(e);
//     yield put(communityActions.updateCommunityViewsFail(e.response));
//   }
// }

function* watchGetCommunityList() {
  while (true) {
    const action = yield take(communityActions.getCommunityList);
    yield call(asyncGetCommunityList, action);
  }
}

function* watchGetCommunityBoard() {
  while (true) {
    const action = yield take(communityActions.getCommunityBoard);
    yield call(asyncGetCommunityBoard, action);
  }
}

// function* watchUpdateCommunityViews() {
//   while (true) {
//     const action = yield take(communityActions.updateCommunityViews);
//     yield call(asyncUpdateCommunityViews, action);
//   }
// }

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

export default function* communitySaga() {
  yield all([
    fork(watchGetCommunityList),
    fork(watchGetCommunityBoard),
    // fork(watchUpdateCommunityViews),
  ]);
}
