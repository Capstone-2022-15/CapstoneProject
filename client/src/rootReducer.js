import { combineReducers } from "redux";
import { signInReducer } from "./slices/signInSlice";
import { calendarReducer } from "./slices/calendarSlice";
import { announcementReducer } from "./slices/announcementSlice";
// import { degreeReducer } from "./slices/degreeSlice";
import { scholarshipReducer } from "./slices/scholarshipSlice";
import { communityReducer } from "./slices/communitySlice";
import { searchReducer } from "./slices/searchSlice";

const rootReducer = combineReducers({
  signInReducer,
  calendarReducer,
  announcementReducer,
  // degreeReducer,
  scholarshipReducer,
  communityReducer,
  searchReducer,
});

export default rootReducer;
