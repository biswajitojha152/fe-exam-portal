import apiSlice from "../app/api/apiSlice";
import config from "../config/config";

const quizApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllQuiz: build.query({
      query: () => ({
        url: config.apiName.getAllQuiz,
        method: "GET",
      }),
      providesTags: ["getAllQuiz"],
    }),
    createQuiz: build.mutation({
      query: (payload) => ({
        url: config.apiName.createQuiz,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["getAllQuiz"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllQuizQuery, useCreateQuizMutation } = quizApi;
