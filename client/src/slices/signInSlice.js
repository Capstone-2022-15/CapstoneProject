import { createSlice } from "@reduxjs/toolkit";

const name = "signin";

const initialState = {
  loading: false,
  payload: {
    code: 0,
    message: "",
    token: "",
  },
};

const reducers = {
  signInRequest: (state, action) => ({ ...state, loading: true }),
  signInSuccess: (state, action) => ({
    ...state,
    loading: true,
    payload: { token: action.payload.token },
  }),
  signInFailure: (state, action) => ({ ...state }),
};

const signInSlice = createSlice({
  name,
  initialState,
  reducers,
});

export const signInReducer = signInSlice.reducer;
export const signInActions = signInSlice.actions;
