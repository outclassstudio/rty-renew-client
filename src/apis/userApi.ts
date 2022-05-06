import { AxiosResponse } from "axios";
import apiClient from ".";

//나의 정보 조회
export const getUserInfo = (): Promise<AxiosResponse<Users.myinfoDTO>> => {
  let myId = localStorage.getItem("id");
  return apiClient()
    .get(`/users/${myId}`)
    .then((res) => {
      return res.data;
    });
};

//다른 사람 찾기
export const findUser = (data: string): Promise<AxiosResponse<string[]>> => {
  return apiClient()
    .get(`/users/find/${data}`)
    .then((res) => {
      return res.data;
    });
};
