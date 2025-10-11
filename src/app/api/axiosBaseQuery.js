import axios from "axios";
import secureStorage from "../../helper/secureStorage";

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
      Authorization: secureStorage.getItem("data")
        ? `${secureStorage.getItem("data").type} ${
            secureStorage.getItem("data").token
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
