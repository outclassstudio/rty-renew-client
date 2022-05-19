import { AxiosResponse } from "axios";
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

//테마 불러오기
export const getThemeList = async (): Promise<AxiosResponse> => {
  return apiClient()
    .get(`/users/theme`)
    .then((res) => {
      return res;
    });
};

//테마 및 상태메시지 변경
export const changeTheme = async (img: string): Promise<AxiosResponse<any>> => {
  const myId = localStorage.getItem("id");
  return apiClient()
    .patch(`/users/${myId}`, { id: myId, theme: img })
    .then((res) => {
      return res;
    });
};

export const changeMsg = async (
  stateMsg: string
): Promise<AxiosResponse<any>> => {
  const myId = localStorage.getItem("id");
  return apiClient()
    .patch(`/users/${myId}`, { id: myId, msg: stateMsg })
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

//비밀번호 확인
export const checkPassowrd = (data: any): Promise<AxiosResponse<boolean>> => {
  return apiClient().post(`/users/pwdcheck`, data);
};

//비밀번호 변경 요청
export const changePassoword = (
  data: Users.changePwDTO
): Promise<AxiosResponse<any>> => {
  return apiClient().post(`/users/updatepwd`, data);
};

//회원탈퇴 요청
export const deleteUser = (): Promise<AxiosResponse<any>> => {
  return apiClient().delete(`/users/${myId}`);
};
