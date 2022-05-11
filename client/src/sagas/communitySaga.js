import axios from "../utils/axios";
import { all, call, fork, put, take } from "redux-saga/effects";
import { communityActions } from "../slices/communitySlice";

function apiGetCommunity(communityId) {
  return axios.get(`api/announcement/${communityId}`);
}

function apiGetCommunityList() {
  return axios.get(`api/announcement`);
}

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

function* watchGetCommunityList() {
  while (true) {
    yield take(communityActions.getCommunityList);
    yield call(asyncGetCommunityList);
  }
}

export default function* communitySaga() {
  yield all([fork(watchGetCommunityList)]);
}
