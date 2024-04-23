import axios from "axios";

const API_BASE_URL = "http://localhost:4000";

axios.interceptors.request.use(
  (config) => {
    config.baseURL = API_BASE_URL;

    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: credentials.email,
      password: credentials.password,
    });
    if (response?.data?.accessToken) {
      return response.data;
    }
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, user);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export const getUsers = async () => {
  try {
    const response = await axios(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};
