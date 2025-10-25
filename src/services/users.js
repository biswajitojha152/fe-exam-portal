import apiSlice from "../app/api/apiSlice";
import config from "../config/config";

const usersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => ({
        url: config.apiName.getAllUser,
        method: "GET",
      }),
    }),
    toggleTheme: build.mutation({
      query: () => ({
        url: config.apiName.toggleTheme,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetAllUserQuery, useToggleThemeMutation } = usersApi;
