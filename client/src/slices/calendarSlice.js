import { createSlice } from "@reduxjs/toolkit";

const name = "calendar";

const initialState = {
  calendar: [],
  status: 0,
  statusText: "Loading",
};

const reducers = {
  getCalendar: (state, action) => {
    state.calendar = action.payload?.data ?? [];
    state.status = action.payload?.status ?? 500;
  },
  getCalendarSuccess: (state, action) => {
    state.calendar = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  getCalendarFailure: (state, action) => {
    state.calendar = initialState.calendar;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
  },
};

const calendarSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const calendarReducer = calendarSlice.reducer;
export const calendarActions = calendarSlice.actions;
