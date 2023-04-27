import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const orderAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

const initialState = orderAdapter.getInitialState({
  status: "idle",
  error: null,
});

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    ordersSet(state, action) {
      orderAdapter.setAll(state, action.payload);
    },
  },
});

// reducers
export default orderSlice.reducer;

// selectors
export const { ordersSet } = orderSlice.actions;
export const { selectAll: selectAllOrders } = orderAdapter.getSelectors(
  (state) => state.order
);
