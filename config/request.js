import axios from "axios";
import Cookies from "js-cookie";
import QueryString from "qs";

export const request = axios.create({
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  baseURL: "https://cnbe.onrender.com/api/v1",
  timeout: 50000,
});

request.defaults.paramsSerializer = {
  serialize: (params) => {
    return QueryString.stringify(params, { arrayFormat: "repeat" });
  },
};

request.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  console.log("Token đã lấy:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("Token không tồn tại");
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const getToken = () => {
  return Cookies.get('token');
};