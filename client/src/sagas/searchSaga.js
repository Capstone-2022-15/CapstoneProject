import axios from "../utils/axios";
import { all, call, fork, put, take } from "redux-saga/effects";
import { searchActions } from "../slices/searchSlice";

const token = window.localStorage.getItem("accessToken");

//----------------------------------
// 첫 화면
function apiPostSearchAccess() {
  const access = axios.post(`api/search`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiPostSearch() {
  axios
    .post(`api/search`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiPostSearchAccess();
      }
      return res.data;
    });
}

//-----------------------------
function* asyncGetScholarship() {
  try {
    const response = yield call(apiPostSearchAccess);
    yield call(apiPostSearch);
    if (response?.status === 200) {
      yield put(searchActions.postSearch(response));
      if (response.data.token)
        setTimeout(() => window.location.reload(true), 800); // 토큰 발생 시 서버에서 새로고침
    } else {
      yield put(searchActions.postSearchFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(searchActions.postSearchFailure(e.response));
  }
}

//---------------------------------
function* watchGetScholarship() {
  while (true) {
    yield take(searchActions.postSearch);
    yield call(asyncGetScholarship);
  }
}

//---------------------------------
export default function* scholarshipSaga() {
  yield all([fork(watchGetScholarship)]);
}
