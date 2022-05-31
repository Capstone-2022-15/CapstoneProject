import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";
import rootReducer from "../rootReducer";
import rootSaga from "../rootSaga";
import history from "./history";
// import { loadState, saveState } from "./localStorage";

const sagaMiddleware = createSagaMiddleware({
  context: { history: history },
});
const initialState = {
  // token: "",
};
// const presistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, logger],
  devTools: true,
  preloadedState: initialState,
});

// store.subscribe(() => {
//   saveState({ ...presistedState, access_token: store.getState().auth.token });
// });

sagaMiddleware.run(rootSaga);

export default store;
