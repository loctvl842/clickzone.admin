import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  accessToken: "",
  fetching: false,
  error: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart(state) {
      state.fetching = true;
      state.error = false;
      state.message = "";
    },
    authSuccess(state, action) {
      const { accessToken, refreshToken } = action.payload;
      state.fetching = false;
      state.error = false;
      state.accessToken = accessToken;
      Cookies.set("refreshToken", refreshToken);
    },
    authFail(_, action) {
      state.fetching = false;
      state.error = true;
      state.message = action.payload;
    },
    authAccessTokenUpdate(state, action) {
      state.accessToken = action.payload;
    },
    authReset(state) {
      state.fetching = false;
      state.error = false;
    },
  },
});

export default authSlice.reducer;
export const {
  authStart,
  authSuccess,
  authFail,
  authReset,
  authAccessTokenUpdate,
} = authSlice.actions;
