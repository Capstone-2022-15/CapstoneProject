import axios from "../utils/axios";
import { all, call, fork, put, take } from "redux-saga/effects";
import { scholarshipActions } from "../slices/scholarshipSlice";

const token = window.localStorage.getItem("accessToken");

//----------------------------------
// 첫 화면
function apiGetScholarshipAccess() {
  const access = axios.get(`api/scholarship`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiGetScholarship() {
  axios
    .get(`api/scholarship`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiGetScholarshipAccess();
      }
      return res.data;
    });
}

// 클릭 시 세부 내용
function apiGetScholarshipBoardAccess(params) {
  const access = axios.get(`api/scholarship/${params}`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiGetScholarshipBoard(params) {
  axios
    .get(`api/scholarship/${params}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiGetScholarshipBoardAccess(params);
      }
      return res.data;
    });
}

// 댓글 호출
function apiGetScholarshipCommentsAccess(params) {
  const access = axios.get(`api/scholarship/${params}/comments`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiGetScholarshipComments(params) {
  axios
    .get(`api/scholarship/${params}/comments`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiGetScholarshipCommentsAccess(params);
      }
      return res.data;
    });
}

// 글 작성
function apiPostScholarshipWriteAccess(req) {
  const access = axios.post(`api/scholarship`, req, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiPostScholarshipWrite(req) {
  axios
    .post(`api/scholarship`, {
      data: req,
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiPostScholarshipWriteAccess(req);
      }
      return res.data;
    });
}

// 글 삭제
function apiDeleteScholarshipAccess(params) {
  const access = axios.delete(`api/scholarship/${params}`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiDeleteScholarship(params) {
  axios
    .delete(`api/scholarship/${params}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiDeleteScholarshipAccess(params);
      }
      return res.data;
    });
}

//-----------------------------
function* asyncGetScholarship() {
  try {
    const response = yield call(apiGetScholarshipAccess);
    yield call(apiGetScholarship);
    if (response?.status === 200) {
      yield put(scholarshipActions.getScholarshipSuccess(response));
      if (response.data.token)
        setTimeout(() => window.location.reload(true), 800); // 토큰 발생 시 서버에서 새로고침
    } else {
      yield put(scholarshipActions.getScholarshipFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(scholarshipActions.getScholarshipFailure(e.response));
  }
}

function* asyncGetScholarshipBoard(action) {
  try {
    const response = yield call(
      apiGetScholarshipBoardAccess,
      action.payload.id
    );
    yield call(apiGetScholarshipBoard, action.payload.id);
    if (response?.status === 200) {
      yield put(scholarshipActions.getScholarshipBoardSuccess(response));
      if (response.data.token)
        setTimeout(() => window.location.reload(true), 800);
    } else {
      yield put(scholarshipActions.getScholarshipBoardFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(scholarshipActions.getScholarshipBoardFailure(e.response));
  }
}

function* asyncGetScholarshipComments(action) {
  try {
    const response = yield call(
      apiGetScholarshipCommentsAccess,
      action.payload.id
    );
    yield call(apiGetScholarshipComments, action.payload.id);
    if (response?.status === 200) {
      yield put(scholarshipActions.getScholarshipCommentsSuccess(response));
    } else {
      yield put(scholarshipActions.getScholarshipCommentsFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(scholarshipActions.getScholarshipCommentsFailure(e.response));
  }
}

function* asyncPostScholarshipWrite(action) {
  try {
    const response = yield call(apiPostScholarshipWriteAccess, {
      ...action.payload,
    });
    yield call(apiPostScholarshipWrite, { ...action.payload });
    if (response?.status === 200) {
      yield put(scholarshipActions.postScholarshipWriteSuccess(response));
    } else {
      yield put(scholarshipActions.postScholarshipWriteFailure(response));
      yield alert(`등록 실패: ${response?.status}, ${response?.statusText}`);
    }
  } catch (e) {
    console.error(e);
    yield put(scholarshipActions.postScholarshipWriteFailure(e.response));
    yield alert(
      `등록 실패: ${e?.response?.status}, ${e?.response?.statusText}`
    );
  }
}

function* asyncDeleteScholarship(action) {
  try {
    const response = yield call(apiDeleteScholarshipAccess, action.payload.id);
    yield call(apiDeleteScholarship, action.payload.id);
    if (response?.status === 200) {
      yield put(scholarshipActions.deleteScholarshipSuccess(response));
    } else {
      yield put(scholarshipActions.deleteScholarshipFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(scholarshipActions.deleteScholarshipFailure(e.response));
  }
}

//---------------------------------
function* watchGetScholarship() {
  while (true) {
    yield take(scholarshipActions.getScholarship);
    yield call(asyncGetScholarship);
  }
}

function* watchGetScholarshipBoard() {
  while (true) {
    const action = yield take(scholarshipActions.getScholarshipBoard);
    yield call(asyncGetScholarshipBoard, action);
  }
}

function* watchGetScholarshipComments() {
  while (true) {
    const action = yield take(scholarshipActions.getScholarshipComments);
    yield call(asyncGetScholarshipComments, action);
  }
}

function* watchPostScholarshipWrite() {
  while (true) {
    const action = yield take(scholarshipActions.postScholarshipWrite);
    yield call(asyncPostScholarshipWrite, action);
  }
}

function* watchDeleteScholarship() {
  while (true) {
    const action = yield take(scholarshipActions.deleteScholarship);
    yield call(asyncDeleteScholarship, action);
  }
}

//---------------------------------
export default function* scholarshipSaga() {
  yield all([
    fork(watchGetScholarship),
    fork(watchGetScholarshipBoard),
    fork(watchGetScholarshipComments),
    fork(watchPostScholarshipWrite),
    fork(watchDeleteScholarship),
  ]);
}
