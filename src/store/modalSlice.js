import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: "",
  active: false,
};

const modalSlice = createSlice({
  name: "confirmModal",
  initialState,
  reducers: {
    modalOpen(state, action) {
      state.type = action.payload;
      state.active = true;
    },
    modalClose(state) {
      state.active = false;
    },
  },
});

export default modalSlice.reducer;
export const { modalClose, modalOpen } = modalSlice.actions;
