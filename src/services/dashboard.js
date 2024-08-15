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
  }),
  overrideExisting: false,
});

export const { useGetDashboardDataQuery } = dashboardApi;
