import { configureStore } from "@reduxjs/toolkit";
import reducer from "./slices/selectSlice";
import authReducer from "./slices/authSlice";
import thunkMiddleware from "redux-thunk";

export default configureStore({
  reducer: {
    selectSlice: reducer,
    authSlice: authReducer,
  },
  middleware: [thunkMiddleware],
  devTools: process.env.NODE_ENV !== "production",
});
