import axios from "../utils/axios";
import { all, call, fork, put, take, retry, select } from "redux-saga/effects";
import qs from "query-string";
import { signInActions } from "../slices/signInSlice";

function apiPostSignIn(id, password) {
  return axios.post(`/api/login`, {
    id: id,
    password: password,
  });
}

function* asyncPostSignIn(action) {
  try {
    const response = yield call(
      apiPostSignIn,
      action.payload.id,
      action.payload.password
    );
    if (response?.status === 200) {
      yield put(signInActions.signInSuccess(response));
    } else {
      yield put(signInActions.signInFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(signInActions.signInFailure(e.response));
  }
}

function* watchPostSignIn() {
  // while (true) {
  //   const action = yield take(communityActions.getCommunityList);
  //   yield call(asyncGetCommunityList, action);
  // }
}

export default function* communitySaga() {
  yield all([fork(watchPostSignIn)]);
}
