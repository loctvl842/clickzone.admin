import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const customerAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.modified_at.localeCompare(a.modified_at),
});

const initialState = customerAdapter.getInitialState({
  status: "idle",
  error: null,
});

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    customerSet(state, action) {
      customerAdapter.setAll(state, action.payload);
    },
  },
});

// reducers
export default customerSlice.reducer;

// selectors
export const { customerSet } = customerSlice.actions;
export const { selectAll: selectAllCustomers } = customerAdapter.getSelectors(
  (state) => state.customer
);
