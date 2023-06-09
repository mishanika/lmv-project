import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: localStorage.getItem("auth") === "true" ? true : false,
    sessionId: localStorage.getItem("sessionId") !== null ? localStorage.getItem("sessionId") : null,
    status: localStorage.getItem("status") !== null ? localStorage.getItem("status") : null,
  },
  reducers: {
    update(state, action) {
      return {
        ...state,
        auth: action.payload.auth,
        sessionId: action.payload.sessionId,
        status: action.payload.status,
      };
    },
  },
});

const { actions, reducer: authReducer } = authSlice;
export const { update } = actions;

export default authReducer;
