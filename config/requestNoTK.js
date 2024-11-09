import axios from "axios";
import QueryString from "qs";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const requestNoTK = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  baseURL: ` ${baseURL}`,
  timeout: 50000,
});

requestNoTK.defaults.paramsSerializer = {
  serialize: (params) => {
    return QueryString.stringify(params, { arrayFormat: "repeat" });
  },
};

requestNoTK.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);