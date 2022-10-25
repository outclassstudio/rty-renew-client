import axios from "axios";
import { BASE_URL, LOCALSTORAGE_TOKEN } from "../constants";

//axios인스턴스 생성
export const apiClient = () => {
  const accessToken = localStorage.getItem(LOCALSTORAGE_TOKEN);

  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      authorization: `${accessToken}`,
    },
    // withCredentials: true,
  });

  return instance;
};
export default apiClient;
