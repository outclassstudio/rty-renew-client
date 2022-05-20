import axios from "axios";

export const apiClient = () => {
  const accessToken = localStorage.getItem("token");

  const instance = axios.create({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  return instance;
};
export default apiClient;
