import axios from "../utils/axios";
import { all, call, fork, put, take } from "redux-saga/effects";
import { signInActions } from "../slices/signInSlice";

//-------------------------------------
function apiPostSignIn(req) {
  return axios.post(`api/login`, req);
}

function apiPostToken(req) {
  return axios.post(`api/login`, req).then((res) => {
    window.localStorage.setItem("accessToken", res.data.token);
  });
}

function apiLogOut() {
  return window.localStorage.removeItem("accessToken");
}

function apiPostSignUp(req) {
  return axios.post(`api/signup`, req);
}

// function apiPostSignUpToken(req) {
//   return axios.post(`api/signup`, req).then((res)=>{
//     axios.get(`api/signup`, req)
//     .then((res) => {
//       return res.data;
//     });
//   });
// }

//-------------------------------------
function* asyncPostSignIn(action) {
  try {
    const response = yield call(apiPostSignIn, { ...action.payload });
    const response2 = yield call(apiPostToken, { ...action.payload });
    if (response?.status === 200 && response.data.token != null) {
      // 통신 성공하고 토큰을 받았을 때만 성공 처리, 토큰 검증 방법 넣기 전까진 != null 임시로
      yield put(signInActions.signInSuccess(response));
      yield call(window.location.reload());
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
    const response = yield call(apiLogOut); // 일반 함수일 때 call 사용, 파라미터 없어도 가능
    if (window.localStorage.getItem("accessToken") == null) {
      yield put(signInActions.logOutSuccess(response));
    } else {
      yield put(signInActions.logOutFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(signInActions.logOutFailure(e.response));
  }
}

function* asyncPostSignUp(action) {
  try {
    const response = yield call(apiPostSignUp, { ...action.payload });
    if (response?.status === 200) {
      yield put(signInActions.signUpSuccess(response));
    } else {
      yield put(signInActions.signUpFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(signInActions.signUpFailure(e.response));
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

function* watchPostSignUp() {
  while (true) {
    const action = yield take(signInActions.signUpRequest);
    yield call(asyncPostSignUp, action);
  }
}

//-------------------------------------------
export default function* communitySaga() {
  yield all([fork(watchPostSignIn), fork(watchLogOut), fork(watchPostSignUp)]);
}
