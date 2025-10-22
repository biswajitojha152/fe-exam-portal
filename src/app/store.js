import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import quizReducer from "../features/quiz/quizSlice";
import headerReducer from "../features/header/headerSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    quiz: quizReducer,
    header: headerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});
