import apiSlice from "../app/api/apiSlice";
import config from "../config/config";

const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getDashboardDataAdmin: build.query({
      query: () => ({
        url: config.apiName.getDashboardDataAdmin,
        method: "GET",
      }),
    }),
    getDashboardDataUser: build.query({
      query: () => ({
        url: config.apiName.getDashboardDataUser,
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
  useGetDashboardDataAdminQuery,
  useGetDashboardDataUserQuery,
  useGetQuizTrailQuery,
  useLazyGetQuizTrailQuery,
} = dashboardApi;
