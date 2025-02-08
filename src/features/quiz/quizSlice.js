import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  categoryInputVal: "",
  searchInput: "",
  pageNo: 1,
  pageSize: 10,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      if (state.category !== action.payload.category) {
        state.pageNo = 1;
      }
      state.category = action.payload.category;
      state.categoryInputVal = action.payload.categoryInputVal;
    },
    setPageNo(state, action) {
      state.pageNo = action.payload;
    },
    setSearchInput(state, action) {
      state.searchInput = action.payload;
      state.pageNo = 1;
    },
  },
});

export const { setCategoryFilter, setPageNo, setSearchInput } =
  quizSlice.actions;

export default quizSlice.reducer;
