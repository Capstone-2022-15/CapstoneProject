import { createSlice } from "@reduxjs/toolkit";

const name = "community";

const initialState = {
  communityList: [],
  community: [],
  communityComments: {},
  status: 0,
  statusText: "Loading",
};

const reducers = {
  // 접속 확인
  postCommunityAccess: (state, action) => {},
  postCommunitySuccess: (state, action) => {
    state.status = action.payload?.status;
  },
  postCommunityFailure: (state, action) => {
    state.status = action.payload?.status ?? 500;
  },

  // 전체 목록
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

  // 내용
  getCommunityBoard: (state, action) => {},
  getCommunityBoardSuccess: (state, action) => {
    state.community = action.payload?.data ?? [];
    state.status = action.payload?.status;
    state.statusText = action.payload?.statusText ?? "Success";
  },
  getCommunityBoardFail: (state, action) => {
    state.community = initialState.communityList;
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
