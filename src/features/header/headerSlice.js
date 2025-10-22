import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "dark",
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = headerSlice.actions;

export default headerSlice.reducer;
