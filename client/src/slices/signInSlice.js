/**
 * access token : json 형식, in memory로 store해야
 * refresh token : httpOnly
 */

import { createSlice } from "@reduxjs/toolkit";

const name = "signin";

const initialState = {
  loading: false,
  value: {
    id: "",
    password: "",
  },
  receiver: {
    code: 0,
    message: "",
    token: "",
  },
  signUp: {
    id: "", // 아이디
    password: "", // 비밀번호
    name: "", // 이름
    nick: "", // 닉네임
    gender: "", // 성별, INTEGER NOT STRING 남자: 0, 여자는: 1
  },
};

const reducers = {
  signInRequest: (state, action) => ({ ...state, loading: true }),
  signInSuccess: (state, action) => ({
    ...state,
    loading: true,
    receiver: {
      code: action.payload.code,
      message: action.payload.message,
      token: action.payload.token,
    },
  }),
  signInFailure: (state, action) => ({ ...state }),

  // tokenRequest: (state, action) => ({
  //   ...state,
  // }),
  // tokenSuccess: (state, action) => ({
  //   ...state,
  //   receiver: { token: action.payload.token },
  // }),
  // tokenFailure: (state, action) => ({
  //   ...state,
  // }),

  logOutRequest: (state, action) => ({
    ...state,
  }),
  logOutSuccess: (state, action) => ({
    ...state,
    initialState,
  }),
  logOutFailure: (state, action) => ({
    ...state,
  }),

  signUpRequest: (state, action) => ({ ...state }),
  signUpSuccess: (state, action) => ({ ...state }),
  signUpFailure: (state, action) => ({ ...state }),
};

const signInSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const signInReducer = signInSlice.reducer;
export const signInActions = signInSlice.actions;
