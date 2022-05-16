import { createSlice } from "@reduxjs/toolkit";

const name = "announcement";

const initialState = {
  announcementList: [],
  status: 0,
  statusText: "Loading",
};

const reducers = {
  getAnnouncementList: (state, action) => {},
  getAnnouncementListSuccess: (state, action) => {
    state.announcementList = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  getAnnouncementListFail: (state, action) => {
    state.announcementList = initialState.announcementList;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
  },
};

const announcementSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const announcementReducer = announcementSlice.reducer;
export const announcementActions = announcementSlice.actions;
