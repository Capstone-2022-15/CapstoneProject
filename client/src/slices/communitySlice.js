import { createSlice } from "@reduxjs/toolkit";

const name = "community";

const initialState = {
  community: [],
  communityBoard: [],
  communityComments: {},
  status: 0,
  statusText: "Loading",
  param: 0,
};

const reducers = {
  // 전체 목록
  getCommunity: (state, action) => {
    state.community = action.payload?.data ?? [];
    state.status = action.payload?.status ?? 500;
  },
  getCommunitySuccess: (state, action) => {
    state.community = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  getCommunityFail: (state, action) => {
    state.community = initialState.community;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
  },

  // 내용
  getCommunityBoard: (state, action) => {
    state.communityBoard = action.payload?.data ?? [];
    state.status = action.payload?.status ?? 500;
    state.param = action.payload;
  },
  getCommunityBoardSuccess: (state, action) => {
    state.communityBoard = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  getCommunityBoardFail: (state, action) => {
    state.communityBoard = initialState.communityBoard;
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
    state.param = initialState.param;
  },

  // 글 쓰기
  postCommunityWrite: (state, action) => {},
  postCommunityWriteSuccess: (state, action) => {
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  postCommunityWriteFailure: (state, action) => {
    state.status = action.payload?.status ?? 500;
    state.statusText = action.payload?.statusText ?? "Network Error";
  },

  // updateCommunity: (state, action) => {},
  // updateCommunitySuccess: (state, action) => {
  //   state.community = action.payload?.data ?? {};
  //   state.status = action.payload?.status;
  //   state.statusText = action.payload?.statusText ?? "Success";
  // },
  // updateCommunityFail: (state, action) => {
  //   state.community = initialState.communityList;
  //   state.status = action.payload?.status ?? 500;
  //   state.statusText = action.payload?.statusText ?? "Network Error";
  // },

  // updateCommunityViews: (state, action) => {},
  // updateCommunityViewsSuccess: (state, action) => {
  //   state.community = action.payload?.data ?? {};
  //   state.status = action.payload?.status;
  //   state.statusText = action.payload?.statusText ?? "Success";
  // },
  // updateCommunityViewsFail: (state, action) => {
  //   state.community = initialState.communityList;
  //   state.status = action.payload?.status ?? 500;
  //   state.statusText = action.payload?.statusText ?? "Network Error";
  // },

  // // 댓글
  // getCommunityComments: (state, action) => {},
  // getCommunityCommentsSuccess: (state, action) => {
  //   state.communityComments = action.payload?.data ?? {};
  //   state.status = action.payload?.status;
  //   state.statusText = action.payload?.statusText ?? "Success";
  // },
  // getCommunityCommentsFail: (state, action) => {
  //   state.communityComments = initialState.communityList;
  //   state.status = action.payload?.status ?? 500;
  //   state.statusText = action.payload?.statusText ?? "Network Error";
  // },

  // updateCommunityComments: (state, action) => {},
  // updateCommunityCommentsSuccess: (state, action) => {
  //   state.communityComments = action.payload?.data ?? {};
  //   state.status = action.payload?.status;
  //   state.statusText = action.payload?.statusText ?? "Success";
  // },
  // updateCommunityCommentsFail: (state, action) => {
  //   state.communityComments = initialState.communityList;
  //   state.status = action.payload?.status ?? 500;
  //   state.statusText = action.payload?.statusText ?? "Network Error";
  // },
};

const communitySlice = createSlice({
  name,
  initialState,
  reducers,
});

export const communityReducer = communitySlice.reducer;
export const communityActions = communitySlice.actions;
