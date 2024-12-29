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
    updateCategory: build.mutation({
      query: (payload) => ({
        url: config.apiName.updateCategory,
        method: "PUT",
        data: payload,
      }),
      invalidatesTags: ["getAllCategory", "getCategoryUpdateListById"],
    }),
    updateCategoriesStatus: build.mutation({
      query: (payload) => ({
        url: config.apiName.updateCategoriesStatus,
        method: "PUT",
        data: payload,
      }),
      invalidatesTags: ["getAllCategory"],
    }),
    getCategoryUpdateListById: build.query({
      query: (payload) => ({
        url: config.apiName.getCategoryUpdateListById,
        method: "GET",
        params: {
          categoryId: payload,
        },
      }),
      providesTags: ["getCategoryUpdateListById"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAllCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useUpdateCategoriesStatusMutation,
  useGetCategoryUpdateListByIdQuery,
} = categoryApi;
