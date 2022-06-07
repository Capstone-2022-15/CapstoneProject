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
  console.log(access);
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
      console.log(res.data);
      return res.data;
    });
}

//-------------------------------------
function* asyncGetCalendar() {
  try {
    const response = yield call(apiGetCalendarAccess);
    yield call(apiGetCalendar);
    console.log("response: ", response);
    if (response?.status === 200) {
      yield put(calendarActions.getCalendarSuccess(response));
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
