import { createSlice } from "@reduxjs/toolkit";

export const selectSlice = createSlice({
  name: "selector",
  initialState: [
    {
      id: 1,
      name: "Asia",
      url: "https://media.gadventures.com/media-server/dynamic/admin/content_pages/tabasiaicon.png",
      selected: false,
    },
    {
      id: 2,
      name: "Central & Caribbean",
      url: "https://media.gadventures.com/media-server/dynamic/admin/content_pages/tabcaicon.png",
      selected: false,
    },
    {
      id: 3,
      name: "Europe",
      url: "https://media.gadventures.com/media-server/dynamic/admin/content_pages/tabeuropeicon.png",
      selected: false,
    },
    {
      id: 4,
      name: "South Americ",
      url: "https://media.gadventures.com/media-server/dynamic/admin/content_pages/tabsaicon.png",
      selected: false,
    },
  ],
  reducers: {
    update(state, action) {
      const newArray = [...state];

      return newArray.forEach((el) => {
        if (el.id === action.payload.id) {
          el.selected = true;
        } else {
          el.selected = false;
        }
      });
    },
  },
});

const { actions, reducer } = selectSlice;
export const { update } = actions;

export default reducer;
