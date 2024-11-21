import apiSlice from "../app/api/apiSlice";
import config from "../config/config";

const quizApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllQuiz: build.query({
      query: (payload) => ({
        url: config.apiName.getAllQuiz,
        method: "GET",
        params: {
          pageNo: payload.pageNo,
          pageSize: payload.pageSize,
          categoryId: payload.categoryId,
          searchInput: payload.searchInput,
        },
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
    saveQuestion: build.mutation({
      query: (payload) => ({
        url: config.apiName.saveQuestion,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["getAllQuestions"],
    }),
    getAllQuestions: build.query({
      query: (payload) => ({
        url: `${config.apiName.getAllQuestions}/${payload}`,
        method: "GET",
      }),
      providesTags: ["getAllQuestions"],
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
  useSaveQuestionMutation,
  useGetAllQuestionsQuery,
} = quizApi;
