import { createSlice } from "@reduxjs/toolkit";
import secureStorage from "../../helper/secureStorage";

const initialState = {
  isDarkTheme: isDarkTheme(),
};

const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    setIsDarkTheme: (state, action) => {
      state.isDarkTheme = action.payload;
    },
  },
});

function isDarkTheme() {
  try {
    return (
      secureStorage.getItem("data") && secureStorage.getItem("data").isDarkTheme
    );
  } catch (err) {
    console.error(err.message);
    return false;
  }
}

export const { setIsDarkTheme } = headerSlice.actions;

export default headerSlice.reducer;
