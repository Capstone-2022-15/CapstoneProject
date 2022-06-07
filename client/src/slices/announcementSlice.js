import { createSlice } from "@reduxjs/toolkit";

const name = "announcement";

const initialState = {
  announcement: [],
  announcementBoard: [],
  announcementComments: {},
  status: 0,
  statusText: "Loading",
  param: 0,
};

const reducers = {
  // 전체 목록
  getAnnouncement: (state, action) => {
    state.announcement = action.payload?.data ?? [];
    state.status = action.payload?.status ?? 500;
  },
  getAnnouncementSuccess: (state, action) => {
    state.announcement = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  getAnnouncementFailure: (state, action) => {
    state.announcement = initialState.announcement;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
  },

  // 내용
  getAnnouncementBoard: (state, action) => {
    state.announcementBoard = action.payload?.data ?? [];
    state.status = action.payload?.status ?? 500;
    state.param = action.payload;
  },
  getAnnouncementBoardSuccess: (state, action) => {
    state.announcementBoard = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  getAnnouncementBoardFailure: (state, action) => {
    state.announcementBoard = initialState.announcementBoard;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
    state.param = initialState.param;
  },

  // 글 쓰기
  postAnnouncementWrite: (state, action) => {},
  postAnnouncementWriteSuccess: (state, action) => {
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  postAnnouncementWriteFailure: (state, action) => {
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
  },

  // updateAnnouncementViews: (state, action) => {},
  // updateAnnouncementViewsSuccess: (state, action) => {
  //   state.announcement = action.payload?.data ?? {};
  //   state.status = action.payload?.status;
  //   state.statusText = action.payload?.statusText ?? "Success";
  // },
  // updateAnnouncementViewsFail: (state, action) => {
  //   state.announcement = initialState.announcementList;
  //   state.status = action.payload?.status ?? 500;
  //   state.statusText = action.payload?.statusText ?? "Network Error";
  // },

  // // 댓글
  getAnnouncementComments: (state, action) => {
    state.announcementComments = action.payload?.data ?? {};
    state.status = action.payload?.status ?? 500;
  },
  getAnnouncementCommentsSuccess: (state, action) => {
    state.announcementComments = action.payload?.data ?? {};
    state.status = action.payload?.status;
  },
  getAnnouncementCommentsFailure: (state, action) => {
    state.announcementComments = initialState.announcementComments;
    state.status = action.payload?.status ?? 500;
  },

  postAnnouncementCommentsWrite: (state, action) => {},
  postAnnouncementCommentsWriteSuccess: (state, action) => {
    state.announcementComments = action.payload?.data ?? {};
    state.status = action.payload?.status;
  },
  postAnnouncementCommentsWriteFailure: (state, action) => {
    state.announcementComments = initialState.announcementList;
    state.status = action.payload?.status ?? 500;
  },
};

const announcementSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const announcementReducer = announcementSlice.reducer;
export const announcementActions = announcementSlice.actions;
