import { createApi, retry } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
import config from "../../config/config";

const apiSlice = createApi({
  baseQuery: retry(axiosBaseQuery({ baseUrl: config.baseUrl }), {
    maxRetries: 1,
  }),
  endpoints: () => ({}),
});

export default apiSlice;
