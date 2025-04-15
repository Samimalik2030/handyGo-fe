import axios from "axios";
import { showNotification } from "@mantine/notifications";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


api.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      showNotification({
        title: "Success",
        message: response.data.message,
        color: "green",
        autoClose: 3000,
        position: "top-right",
      });
    }
    return response;
  },
  (error) => {
    showNotification({
      title: "Error",
      message: error.response?.data?.message || "Something went wrong",
      color: "red",
      autoClose: 5000,
      position: "top-right",
    });
    return Promise.reject(error);
  }
);

export default api;
