import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  categoryInputVal: "",
  searchInput: "",
  pageNo: 0,
  pageSize: 10,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setCategoryFilter: (state, action) => {
      state.category = action.payload.category;
      state.categoryInputVal = action.payload.categoryInputVal;
      state.pageNo = 0;
    },
    setPageNo(state, action) {
      state.pageNo = action.payload;
    },
    setPageSizeAndPageNo(state, action) {
      state.pageSize = action.payload.pageSize;
      state.pageNo = action.payload.pageNo;
    },
    setSearchInput(state, action) {
      state.searchInput = action.payload;
      state.pageNo = 0;
    },
  },
});

export const {
  setCategoryFilter,
  setPageNo,
  setPageSizeAndPageNo,
  setSearchInput,
} = quizSlice.actions;

export default quizSlice.reducer;
