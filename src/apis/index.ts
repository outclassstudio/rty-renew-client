import axios from "axios";
import { LOCALSTORAGE_TOKEN } from "../constants";

//axios인스턴스 생성
export const apiClient = () => {
  const accessToken = localStorage.getItem(LOCALSTORAGE_TOKEN);

  const instance = axios.create({
    headers: {
      authorization: `${accessToken}`,
    },
    // withCredentials: true,
  });

  return instance;
};
export default apiClient;
