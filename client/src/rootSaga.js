import { map } from "ramda";
import { all, fork } from "redux-saga/effects";
import communitySaga from "./sagas/communitySaga";

let combineSagas = {};
combineSagas = Object.assign(combineSagas, { communitySaga });

export default function* rootSaga() {
  yield all(map(fork, combineSagas));
}
