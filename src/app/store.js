import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import quizReducer from "../features/quiz/quizSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    quiz: quizReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
