import axios from "../utils/axios";
import { all, call, fork, put, take } from "redux-saga/effects";
import { announcementActions } from "../slices/announcementSlice";

function apiGetAnnouncement(announcementId) {
  return axios.get(`api/announcement/${announcementId}`);
}

function apiGetAnnouncementList() {
  return axios.get(`api/announcement`);
}

function* asyncGetAnnouncementList() {
  try {
    const response = yield call(apiGetAnnouncementList);
    if (response?.status === 200) {
      yield put(announcementActions.getAnnouncementListSuccess(response));
    } else {
      yield put(announcementActions.getAnnouncementListFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(announcementActions.getAnnouncementListFail(e.response));
  }
}

function* watchGetAnnouncementList() {
  while (true) {
    yield take(announcementActions.getAnnouncementList);
    yield call(asyncGetAnnouncementList);
  }
}

export default function* announcementSaga() {
  yield all([fork(watchGetAnnouncementList)]);
}
