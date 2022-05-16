import axios from "../utils/axios";
import { all, call, fork, put, take } from "redux-saga/effects";
import { degreeActions } from "../slices/degreeSlice";

function apiGetDegree(degreeId) {
  return axios.get(`api/degree/${degreeId}`);
}

function apiGetDegreeList() {
  return axios.get(`api/degree`);
}

function* asyncGetDegreeList() {
  try {
    const response = yield call(apiGetDegreeList);
    if (response?.status === 200) {
      yield put(degreeActions.getDegreeListSuccess(response));
    } else {
      yield put(degreeActions.getDegreeListFail(response));
    }
  } catch (e) {
    console.error(e);
    yield put(degreeActions.getDegreeListFail(e.response));
  }
}

function* watchGetDegreeList() {
  while (true) {
    yield take(degreeActions.getDegreeList);
    yield call(asyncGetDegreeList);
  }
}

export default function* degreeSaga() {
  yield all([fork(watchGetDegreeList)]);
}
