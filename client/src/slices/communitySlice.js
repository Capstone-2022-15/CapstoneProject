import { createSlice } from "@reduxjs/toolkit";

const name = "community";

const initialState = {
  communityList: [],
  status: 0,
  statusText: "Loading",
};

const reducers = {
  getCommunityList: (state, action) => {},
  getCommunityListSuccess: (state, action) => {
    state.communityList = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  getCommunityListFail: (state, action) => {
    state.communityList = initialState.communityList;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
  },
};

const communitySlice = createSlice({
  name,
  initialState,
  reducers,
});

export const communityReducer = communitySlice.reducer;
export const communityActions = communitySlice.actions;
