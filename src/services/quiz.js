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
      invalidatesTags: [
        "getAllQuiz",
        "getAllCategory",
        "getQuizIdsWithQuizCount",
      ],
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
      invalidatesTags: [
        "getAllQuiz",
        "getQuizById",
        "getQuizIdsWithQuizCount",
        "getQuizUpdateListById",
      ],
    }),

    updateQuizzesStatus: build.mutation({
      query: (payload) => ({
        url: config.apiName.updateQuizzesStatus,
        method: "PUT",
        data: payload,
      }),
      invalidatesTags: [
        "getAllQuiz",
        "getQuizById",
        "getQuizIdsWithQuizCount",
        "getAllCategory",
        "getQuizzesStatusUpdateList",
      ],
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
    getQuizIdsWithQuizCount: build.query({
      query: (payload) => ({
        url: config.apiName.getQuizIdsWithQuizCount,
        method: "GET",
        params: {
          categoryId: payload.categoryId,
          searchInput: payload.searchInput,
        },
      }),
      providesTags: ["getQuizIdsWithQuizCount"],
    }),
    getQuizUpdateListById: build.query({
      query: (payload) => ({
        url: config.apiName.getQuizUpdateListById,
        method: "GET",
        params: {
          quizId: payload,
        },
      }),
      providesTags: ["getQuizUpdateListById"],
    }),
    getQuizzesStatusUpdateList: build.query({
      query: () => ({
        url: config.apiName.getQuizzesStatusUpdateList,
        method: "GET",
      }),
      providesTags: ["getQuizzesStatusUpdateList"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useUpdateQuizzesStatusMutation,
  useGetQuizByIdQuery,
  useSaveQuestionMutation,
  useGetAllQuestionsQuery,
  useGetQuizIdsWithQuizCountQuery,
  useGetQuizUpdateListByIdQuery,
  useGetQuizzesStatusUpdateListQuery,
} = quizApi;
