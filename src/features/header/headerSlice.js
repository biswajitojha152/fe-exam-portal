import { createSlice } from "@reduxjs/toolkit";
import secureStorage from "../../helper/secureStorage";

const initialState = {
  theme: getTheme(),
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

function getTheme() {
  try {
    return secureStorage.getItem("data") &&
      secureStorage.getItem("data").isDarkTheme
      ? "dark"
      : "light";
  } catch (err) {
    console.error(err.message);
    return "light";
  }
}

export const { setTheme } = headerSlice.actions;

export default headerSlice.reducer;
