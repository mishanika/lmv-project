import { createSlice } from "@reduxjs/toolkit";

export const toursFetchSlice = createSlice({
  name: "selector",
  initialState: {
    loading: false,
    data: [],
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

const { actions, reducer: toursFetchReducer } = toursFetchSlice;
export const { update } = actions;

export default toursFetchReducer;
