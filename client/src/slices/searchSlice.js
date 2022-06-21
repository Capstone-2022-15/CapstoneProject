import { createSlice } from "@reduxjs/toolkit";

const name = "search";

const initialState = {
  search: [],
  status: 0,
  statusText: "Loading",
};

const reducers = {
  // 전체 목록
  postSearch: (state, action) => {
    state.scholarship = action.payload?.data ?? [];
    state.status = action.payload?.status ?? 500;
  },
  postSearchSuccess: (state, action) => {
    state.scholarship = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  postSearchFailure: (state, action) => {
    state.scholarship = initialState.scholarship;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
  },
};

const searchSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const searchReducer = searchSlice.reducer;
export const searchActions = searchSlice.actions;
