import axios from "axios";

//axios인스턴스 생성
export const apiClient = () => {
  const accessToken = localStorage.getItem("token");

  const instance = axios.create({
    headers: {
      authorization: `${accessToken}`,
    },
    withCredentials: true,
  });

  return instance;
};
export default apiClient;
