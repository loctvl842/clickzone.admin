import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet(state, action) {
      state.data = action.payload;
    },
    userReset(state, _) {
      state.data = null;
    },
    userFetchFinish(state) {
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
export const { userSet, userReset, userFetchFinish } = userSlice.actions;
