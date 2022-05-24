import axios from "../utils/axios";
import { all, call, fork, put, take } from "redux-saga/effects";
import { signInActions } from "../slices/signInSlice";

//-------------------------------------
function apiPostSignIn(req) {
  return axios.post(`api/login`, req);
}

function apiPostToken(req) {
  return axios.post(`api/login`, req).then((res) => {
    localStorage.setItem("accessToken", res.data.token);
  });
}

function apiLogOut() {
  return localStorage.removeItem("accessToken");
}

//-------------------------------------
function* asyncPostSignIn(action) {
  try {
    const response = yield call(apiPostSignIn, {
      ...action.payload,
    });
    const response2 = yield call(apiPostToken, {
      ...action.payload,
    });
    if (response?.status === 200 && response.data.token != null) {
      // 통신 성공하고 토큰을 받았을 때만 성공 처리, 토큰 검증 방법 넣기 전까진 != null 임시로
      yield put(signInActions.signInSuccess(response));
    } else {
      yield put(signInActions.signInFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(signInActions.signInFailure(e.response));
  }
}

function* asyncLogOut() {
  try {
    const res = yield put(apiLogOut);
    yield put(signInActions.logOutSuccess(res));
  } catch (e) {
    console.error(e);
  }
}

//----------------------------------------
function* watchPostSignIn() {
  while (true) {
    const action = yield take(signInActions.signInRequest);
    yield call(asyncPostSignIn, action);
  }
}

function* watchLogOut() {
  while (true) {
    const action = yield take(signInActions.logOutRequest);
    yield call(asyncLogOut, action);
  }
}

//-------------------------------------------
export default function* communitySaga() {
  yield all([fork(watchPostSignIn), fork(watchLogOut)]);
}
