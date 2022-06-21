import { createSlice } from "@reduxjs/toolkit";

const name = "scholarship";

const initialState = {
  scholarship: [],
  scholarshipBoard: [],
  scholarshipComments: {},
  status: 0,
  statusText: "Loading",
  param: 0,
};

const reducers = {
  // 전체 목록
  getScholarship: (state, action) => {
    state.scholarship = action.payload?.data ?? [];
    state.status = action.payload?.status ?? 500;
  },
  getScholarshipSuccess: (state, action) => {
    state.scholarship = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  getScholarshipFailure: (state, action) => {
    state.scholarship = initialState.scholarship;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
  },

  // 내용
  getScholarshipBoard: (state, action) => {
    state.scholarshipBoard = action.payload?.data ?? [];
    state.status = action.payload?.status ?? 500;
    state.param = action.payload;
  },
  getScholarshipBoardSuccess: (state, action) => {
    state.scholarshipBoard = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  getScholarshipBoardFailure: (state, action) => {
    state.scholarshipBoard = initialState.scholarshipBoard;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
    state.param = initialState.param;
  },

  // 글 쓰기
  postScholarshipWrite: (state, action) => {},
  postScholarshipWriteSuccess: (state, action) => {
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  postScholarshipWriteFailure: (state, action) => {
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
  },

  // updateScholarshipViews: (state, action) => {},
  // updateScholarshipViewsSuccess: (state, action) => {
  //   state.scholarship = action.payload?.data ?? {};
  //   state.status = action.payload?.status;
  //   state.statusText = action.payload?.statusText ?? "Success";
  // },
  // updateScholarshipViewsFail: (state, action) => {
  //   state.scholarship = initialState.scholarshipList;
  //   state.status = action.payload?.status ?? 500;
  //   state.statusText = action.payload?.statusText ?? "Network Error";
  // },

  // 댓글 불러오기
  getScholarshipComments: (state, action) => {
    state.scholarshipComments = action.payload?.data ?? {};
    state.status = action.payload?.status ?? 500;
  },
  getScholarshipCommentsSuccess: (state, action) => {
    state.scholarshipComments = action.payload?.data ?? {};
    state.status = action.payload?.status;
  },
  getScholarshipCommentsFailure: (state, action) => {
    state.scholarshipComments = initialState.scholarshipComments;
    state.status = action.payload?.status ?? 500;
  },

  // 글 쓰기
  postScholarshipCommentsWrite: (state, action) => {},
  postScholarshipCommentsWriteSuccess: (state, action) => {
    state.scholarshipComments = action.payload?.data ?? {};
    state.status = action.payload?.status;
  },
  postScholarshipCommentsWriteFailure: (state, action) => {
    state.scholarshipComments = initialState.scholarshipList;
    state.status = action.payload?.status ?? 500;
  },

  // 글 삭제
  deleteScholarship: (state, action) => {},
  deleteScholarshipSuccess: (state, action) => {
    state.status = action.payload?.status;
  },
  deleteScholarshipFailure: (state, action) => {
    state.status = action.payload?.status ?? 500;
  },
};

const scholarshipSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const scholarshipReducer = scholarshipSlice.reducer;
export const scholarshipActions = scholarshipSlice.actions;
