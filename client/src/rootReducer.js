import { combineReducers } from "redux";
import { announcementReducer } from "./slices/announcementSlice";
import { degreeReducer } from "./slices/degreeSlice";
import { scholarshipReducer } from "./slices/scholarshipSlice";
import { communityReducer } from "./slices/communitySlice";

const rootReducer = combineReducers({
  announcementReducer,
  degreeReducer,
  scholarshipReducer,
  communityReducer,
});

export default rootReducer;
