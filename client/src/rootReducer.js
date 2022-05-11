import { combineReducers } from "redux";
// import { articleReducer } from "./slices/articleSlice";
import { communityReducer } from "./slices/communitySlice";

const rootReducer = combineReducers({ communityReducer });

export default rootReducer;
