import { createSlice } from "@reduxjs/toolkit";

const name = "scholarship";

const initialState = {
  scholarshipList: [],
  status: 0,
  statusText: "Loading",
};

const reducers = {
  getScholarshipList: (state, action) => {},
  getScholarshipListSuccess: (state, action) => {
    state.scholarshipList = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  getScholarshipListFail: (state, action) => {
    state.scholarshipList = initialState.scholarshipList;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
  },
};

const scholarshipSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const scholarshipReducer = scholarshipSlice.reducer;
export const scholarshipActions = scholarshipSlice.actions;
