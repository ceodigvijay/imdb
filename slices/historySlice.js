import { createSlice } from "@reduxjs/toolkit";

export const historySlice = createSlice({
  name: "counter",
  initialState: {
    movies: {},
  },
  reducers: {
    addItem: (state, action) => {
      state.movies[action.payload.id] = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem } = historySlice.actions;

export default historySlice.reducer;
