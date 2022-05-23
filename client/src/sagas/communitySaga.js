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
import { all, call, fork, put, take, retry, select } from "redux-saga/effects";
import qs from "query-string";
import { communityActions } from "../slices/communitySlice";

const SECOND = 1000;

function apiGetCommunityList() {
  return axios.get(`api/community`);
}

function apiGetCommunity(params) {
  return axios.get(
    `api/community/${qs.stringify(params).replace(/[^0-9]/g, "")}` // 진짜 이 방식 뿐인가? 너무 추하다.
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
    const response = yield call(apiGetCommunityList);
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

function* asyncGetCommunity(action) {
  try {
    const response = yield retry(5, 10 * SECOND, apiGetCommunity, {
      idx: action.payload,
    });
    console.log(response);
    console.log(action.payload);
    if (response?.status === 200) {
      yield put(communityActions.getCommunitySuccess(response));
      // yield put(communityActions.updateCommunityViews(response.data));
    } else {
      yield put(communityActions.getCommunityFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(communityActions.getCommunityFail(e.response));
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

function* watchGetCommunity() {
  while (true) {
    const action = yield take(communityActions.getCommunity);
    yield call(asyncGetCommunity, action);
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
    fork(watchGetCommunity),
    // fork(watchUpdateCommunityViews),
  ]);
}
