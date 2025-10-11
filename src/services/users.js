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
  }),
});

export const { useGetAllUserQuery } = usersApi;
