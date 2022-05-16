import axios from "../utils/axios";
import { all, call, fork, put, take } from "redux-saga/effects";
import { scholarshipActions } from "../slices/scholarshipSlice";

function apiGetScholarship(scholarshipId) {
  return axios.get(`api/scholarship/${scholarshipId}`);
}

function apiGetScholarshipList() {
  return axios.get(`api/scholarship`);
}

function* asyncGetScholarshipList() {
  try {
    const response = yield call(apiGetScholarshipList);
    if (response?.status === 200) {
      yield put(scholarshipActions.getScholarshipListSuccess(response));
    } else {
      yield put(scholarshipActions.getScholarshipListFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(scholarshipActions.getScholarshipListFail(e.response));
  }
}

function* watchGetScholarshipList() {
  while (true) {
    yield take(scholarshipActions.getScholarshipList);
    yield call(asyncGetScholarshipList);
  }
}

export default function* scholarshipSaga() {
  yield all([fork(watchGetScholarshipList)]);
}
