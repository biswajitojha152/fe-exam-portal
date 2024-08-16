import apiSlice from "../app/api/apiSlice";
import config from "../config/config";

const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAllCategory: build.query({
      query: () => ({
        url: config.apiName.getAllCategory,
        method: "GET",
      }),
      providesTags: ["getAllCategory"],
    }),
    createCategory: build.mutation({
      query: (payload) => ({
        url: config.apiName.createCategory,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["getAllCategory"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllCategoryQuery, useCreateCategoryMutation } =
  categoryApi;
