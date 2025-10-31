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
    getAllRecommendedQuiz: build.query({
      query: () => ({
        url: config.apiName.getAllRecommendedQuiz,
        method: "GET",
      }),
      providesTags: ["getAllRecommendedQuiz"],
    }),
    createQuiz: build.mutation({
      query: (payload) => ({
        url: config.apiName.createQuiz,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: [
        "getAllQuiz",
        "getAllRecommendedQuiz",
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
        "getAllRecommendedQuiz",
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
        "getAllRecommendedQuiz",
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
    importQuestionsExcel: build.mutation({
      query: (payload) => ({
        url: config.apiName.importQuestionsExcel,
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
    getQuizInstructions: build.query({
      query: (payload) => ({
        url: config.apiName.getQuizInstructions,
        method: "GET",
        params: {
          quizId: payload,
        },
      }),
    }),
    startQuiz: build.mutation({
      query: (payload) => ({
        url: config.apiName.startQuiz,
        method: "POST",
        data: payload,
      }),
    }),
    submitQuiz: build.mutation({
      query: () => ({
        url: config.apiName.submitQuiz,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllQuizQuery,
  useGetAllRecommendedQuizQuery,
  useLazyGetAllQuizQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useUpdateQuizzesStatusMutation,
  useGetQuizByIdQuery,
  useSaveQuestionMutation,
  useImportQuestionsExcelMutation,
  useGetAllQuestionsQuery,
  useGetQuizIdsWithQuizCountQuery,
  useGetQuizUpdateListByIdQuery,
  useGetQuizzesStatusUpdateListQuery,
  useGetQuizInstructionsQuery,
  useStartQuizMutation,
  useSubmitQuizMutation,
} = quizApi;
