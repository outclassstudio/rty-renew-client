import { Axios, AxiosResponse } from "axios";
import apiClient from ".";

let myId = localStorage.getItem("id");

//나의 정보 조회
export const getUserInfo = async (): Promise<
  AxiosResponse<Users.myinfoDTO>
> => {
  return apiClient()
    .get(`/users/${myId}`)
    .then((res) => {
      return res;
    });
};

//다른 사람 찾기
export const findUser = async (
  data: string
): Promise<AxiosResponse<string[]>> => {
  return apiClient()
    .get(`/users/find/${data}`)
    .then((res) => {
      return res;
    });
};

//로그아웃 요청
export const logoutUser = (): Promise<AxiosResponse<any>> => {
  return apiClient().delete("/users/logout");
};

//정보수정 요청
export const patchUserInfo = (data: any): Promise<AxiosResponse<any>> => {
  return apiClient().patch(`/users/${myId}`, data);
};
