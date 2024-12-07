import apiSlice from "../app/api/apiSlice";
import config from "../config/config";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getDashboardData: build.query({
      query: () => ({
        url: config.apiName.getDashboardData,
        method: "GET",
      }),
    }),
    getQuizTrail: build.query({
      query: (payload) => ({
        url: config.apiName.getQuizTrail,
        method: "GET",
        params: {
          fromDate: payload.fromDate,
          toDate: payload.toDate,
          searchByUsername: payload.searchByUsername,
          categoryId: payload.categoryId,
          quizId: payload.quizId,
          status: payload.status,
          pageNo: payload.pageNo,
          pageSize: payload.pageSize,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetDashboardDataQuery,
  useGetQuizTrailQuery,
  useLazyGetQuizTrailQuery,
} = dashboardApi;
