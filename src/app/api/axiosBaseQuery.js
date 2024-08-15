import axios from "axios";

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: getOptions(),
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

function getOptions() {
  try {
    return {
      Authorization: sessionStorage.getItem("data")
        ? `${JSON.parse(sessionStorage.getItem("data")).type} ${
            JSON.parse(sessionStorage.getItem("data")).token
          }`
        : null,
    };
  } catch (err) {
    console.error(err.message);
    return {
      Authorization: null,
    };
  }
}

export default axiosBaseQuery;
