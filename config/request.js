import axios from "axios";
import QueryString from "qs";

export const request = axios.create({
  headers: {
    "content-type": "application/json;charset=UTF-8",
  },
  baseURL: "https://cnbe.onrender.com/api/v1",
  timeout: 50000,
  withCredentials: true, // Cho phép gửi cookie cùng với yêu cầu
});

request.defaults.paramsSerializer = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  serialize: (params) => {
    return QueryString.stringify(params, { arrayFormat: "repeat" });
  },
};

// Interceptor yêu cầu
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor phản hồi
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized - Token không hợp lệ hoặc không tồn tại.");
    }
    return Promise.reject(error);
  }
);
