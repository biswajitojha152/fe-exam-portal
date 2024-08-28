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
    getQuizById: build.query({
      query: (payload) => ({
        url: config.apiName.getQuizById + `/${payload}`,
        method: "GET",
      }),
      providesTags: ["getQuizById"],
    }),
    updateQuiz: build.mutation({
      query: (payload) => ({
        url: config.apiName.updateQuiz,
        method: "PUT",
        data: payload,
      }),
      invalidatesTags: ["getAllQuiz", "getQuizById"],
    }),
    updateQuizStatus: build.mutation({
      query: (payload) => ({
        url: config.apiName.updateQuizStatus,
        method: "PUT",
        data: payload,
      }),
      invalidatesTags: ["getAllQuiz", "getQuizById"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useUpdateQuizStatusMutation,
  useGetQuizByIdQuery,
} = quizApi;
