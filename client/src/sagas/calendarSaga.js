import axios from "../utils/axios";
import { all, call, fork, put, take } from "redux-saga/effects";
import { calendarActions } from "../slices/calendarSlice";

const token = window.localStorage.getItem("accessToken");

//----------------------------------------
function apiGetCalendarAccess() {
  const access = axios.get(`api/calendar`, {
    headers: {
      Authorization: token,
    },
  });
  return access;
}
function apiGetCalendar() {
  axios
    .get(`api/calendar`, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      if (res.data.token) {
        window.localStorage.setItem("accessToken", res.data.token);
        apiGetCalendarAccess();
      }
      return res.data;
    });
}

//-------------------------------------
function* asyncGetCalendar() {
  try {
    const response = yield call(apiGetCalendarAccess);
    yield call(apiGetCalendar);
    // console.log("response: ", response);
    if (response?.status === 200) {
      yield put(calendarActions.getCalendarSuccess(response));
      if (response.data.token)
        setTimeout(() => window.location.reload(true), 800);
    } else {
      yield put(calendarActions.getCalendarFailure(response));
    }
  } catch (e) {
    console.error(e);
    yield put(calendarActions.getCalendarFailure(e.response));
  }
}

//-------------------------------------
function* watchGetCalendar() {
  while (true) {
    const action = yield take(calendarActions.getCalendar);
    yield call(asyncGetCalendar, action);
  }
}

//------------------------------------
export default function* calendarSaga() {
  yield all([fork(watchGetCalendar)]);
}
