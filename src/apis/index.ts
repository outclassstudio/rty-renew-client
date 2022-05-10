import axios from "axios";

const BASE_URL = "http://192.168.10.156:8080";

export const apiClient = () => {
  const accessToken = localStorage.getItem("token");

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return instance;
};
export default apiClient;
