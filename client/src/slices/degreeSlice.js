// import { createSlice } from "@reduxjs/toolkit";

// const name = "degree";

// const initialState = {
//   degreeList: [],
//   status: 0,
//   statusText: "Loading",
// };

// const reducers = {
//   getDegreeList: (state, action) => {},
//   getDegreeListSuccess: (state, action) => {
//     state.degreeList = action.payload?.data ?? [];
//     state.status = action.payload?.status;
//     state.statusText = action.payload?.statusText ?? "Success";
//   },
//   getDegreeListFail: (state, action) => {
//     state.degreeList = initialState.degreeList;
//     state.status = action.payload?.status ?? 500;
//     state.statusText = action.payload?.statusText ?? "Network Error";
//   },
// };

// const degreeSlice = createSlice({
//   name,
//   initialState,
//   reducers,
// });

// export const degreeReducer = degreeSlice.reducer;
// export const degreeActions = degreeSlice.actions;
