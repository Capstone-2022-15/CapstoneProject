import axios from "../utils/axios";
import { all, call, fork, put, take } from "redux-saga/effects";
import { announcementActions } from "../slices/announcementSlice";

const token = window.localStorage.getItem("accessToken");

//----------------------------------
// 첫 화면
function apiGetAnnouncementAccess() {
  const access = axios.get(`api/announcement`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiGetAnnouncement() {
  axios
    .get(`api/announcement`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiGetAnnouncementAccess();
      }
      return res.data;
    });
}

// 세부
function apiGetAnnouncementBoardAccess(params) {
  const access = axios.get(`api/announcement/${params}`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiGetAnnouncementBoard(params) {
  axios
    .get(`api/announcement/${params}`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiGetAnnouncementBoardAccess(params);
      }
      return res.data;
    });
}

// 댓글 호출
function apiGetAnnouncementCommentsAccess(params) {
  const access = axios.get(`api/announcement/${params}/comments`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiGetAnnouncementComments(params) {
  axios
    .get(`api/announcement/${params}/comments`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiGetAnnouncementCommentsAccess(params);
      }
      return res.data;
    });
}

// 글 작성
function apiPostAnnouncementWriteAccess(req) {
  const access = axios.post(`api/announcement`, req, {
    headers: {
      Authorization: token,
    },
  });
  console.log(access);
  return access;
}
function apiPostAnnouncementWrite(req) {
  axios
    .post(`api/announcement`, {
      data: req,
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiPostAnnouncementWriteAccess(req);
      }
      return res.data;
    });
}

//-----------------------------
function* asyncGetAnnouncement() {
  try {
    const response = yield call(apiGetAnnouncementAccess);
    yield call(apiGetAnnouncement);
    if (response?.status === 200) {
      yield put(announcementActions.getAnnouncementSuccess(response));
      if (response.data.token)
        setTimeout(() => window.location.reload(true), 800); // 토큰 발생 시 서버에서 새로고침
    } else {
      yield put(announcementActions.getAnnouncementFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(announcementActions.getAnnouncementFailure(e.response));
  }
}

function* asyncGetAnnouncementBoard(action) {
  try {
    const response = yield call(
      apiGetAnnouncementBoardAccess,
      action.payload.id
    );
    yield call(apiGetAnnouncementBoard, action.payload.id);
    if (response?.status === 200) {
      yield put(announcementActions.getAnnouncementBoardSuccess(response));
      if (response.data.token)
        setTimeout(() => window.location.reload(true), 800);
    } else {
      yield put(announcementActions.getAnnouncementBoardFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(announcementActions.getAnnouncementBoardFailure(e.response));
  }
}

function* asyncGetAnnouncementComments(action) {
  try {
    const response = yield call(
      apiGetAnnouncementCommentsAccess,
      action.payload.id
    );
    yield call(apiGetAnnouncementComments, action.payload.id);
    if (response?.status === 200) {
      yield put(announcementActions.getAnnouncementCommentsSuccess(response));
    } else {
      yield put(announcementActions.getAnnouncementCommentsFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(announcementActions.getAnnouncementCommentsFailure(e.response));
  }
}

function* asyncPostAnnouncementWrite(action) {
  try {
    const response = yield call(apiPostAnnouncementWriteAccess, {
      ...action.payload,
    });
    yield call(apiPostAnnouncementWrite, { ...action.payload });
    if (response?.status === 200) {
      yield put(announcementActions.postAnnouncementWriteSuccess(response));
    } else {
      yield put(announcementActions.postAnnouncementWriteFailure(response));
      yield alert(`등록 실패: ${response?.status}, ${response?.statusText}`);
    }
  } catch (e) {
    console.error(e);
    yield put(announcementActions.postAnnouncementWriteFailure(e.response));
    yield alert(
      `등록 실패: ${e?.response?.status}, ${e?.response?.statusText}`
    );
  }
}

//---------------------------------
function* watchGetAnnouncement() {
  while (true) {
    yield take(announcementActions.getAnnouncement);
    yield call(asyncGetAnnouncement);
  }
}

function* watchGetAnnouncementBoard() {
  while (true) {
    const action = yield take(announcementActions.getAnnouncementBoard);
    yield call(asyncGetAnnouncementBoard, action);
  }
}

function* watchGetAnnouncementComments() {
  while (true) {
    const action = yield take(announcementActions.getAnnouncementComments);
    yield call(asyncGetAnnouncementComments, action);
  }
}

function* watchPostAnnouncementWrite() {
  while (true) {
    const action = yield take(announcementActions.postAnnouncementWrite);
    yield call(asyncPostAnnouncementWrite, action);
  }
}

//---------------------------------
export default function* announcementSaga() {
  yield all([
    fork(watchGetAnnouncement),
    fork(watchGetAnnouncementBoard),
    fork(watchGetAnnouncementComments),
    fork(watchPostAnnouncementWrite),
  ]);
}
