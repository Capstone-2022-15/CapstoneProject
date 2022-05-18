import { map } from "ramda";
import { all, fork } from "redux-saga/effects";
import signInSaga from "./sagas/signInSaga";
import announcementSaga from "./sagas/announcementSaga";
import degreeSaga from "./sagas/degreeSaga";
import scholarshipSaga from "./sagas/scholarshipSaga";
import communitySaga from "./sagas/communitySaga";

let combineSagas = {};
combineSagas = Object.assign(combineSagas, {
  signInSaga,
  announcementSaga,
  scholarshipSaga,
  degreeSaga,
  communitySaga,
});

export default function* rootSaga() {
  yield all(map(fork, combineSagas));
}
