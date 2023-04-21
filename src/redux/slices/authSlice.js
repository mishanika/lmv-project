import { createSlice } from "@reduxjs/toolkit";

export const selectSlice = createSlice({
  name: "selector",
  initialState: {
    auth: localStorage.getItem("auth") === "true" ? true : false,
    sessionId: localStorage.getItem("sessionId") !== null ? localStorage.getItem("sessionId") : null,
    status: localStorage.getItem("member") !== null ? localStorage.getItem("member") : null,
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

const { actions, reducer: authReducer } = selectSlice;
export const { update } = actions;

export default authReducer;
