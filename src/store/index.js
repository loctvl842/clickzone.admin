import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import modalReducer from "./modalSlice";
import customerReducer from "./customerSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    product: productReducer,
    modal: modalReducer,
    customer: customerReducer,
  },
});
