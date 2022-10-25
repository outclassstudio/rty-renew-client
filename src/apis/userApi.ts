import { AxiosResponse } from "axios";
import apiClient from ".";

const myId = localStorage.getItem("id");

//나의 정보 조회(ok)
export const getMyInfo = async (): Promise<
  AxiosResponse<Users.UserInfoResponse>
> => {
  return apiClient()
    .get(`users/${myId}`)
    .then((res) => {
      return res;
    });
};

//남의 정보 조회(ok)
export const getOthersInfo = async (
  id: string
): Promise<AxiosResponse<Users.UserInfoResponse>> => {
  return apiClient()
    .get(`users/others/${id}`)
    .then((res) => {
      return res;
    });
};

//테마 및 상태메시지 변경
//!patchUserInfo와 같은 api
export const changeTheme = async (
  themeId: number
): Promise<AxiosResponse<any>> => {
  return apiClient()
    .patch(`users/theme/${themeId}`)
    .then((res) => {
      return res;
    });
};

//메시지 바꾸기
//!patchUserInfo와 같은 api
export const changeMsg = async (
  stateMsg: string
): Promise<AxiosResponse<any>> => {
  return apiClient()
    .patch(`users`, { msg: stateMsg })
    .then((res) => {
      return res;
    });
};

//!다른 사람 찾기
export const findUser = async (
  userId: string
): Promise<AxiosResponse<Users.FindUserResponse>> => {
  return apiClient()
    .get(`users/find/${userId}`)
    .then((res) => {
      return res;
    });
};

//!다른 사람 랜덤 찾기
export const findRandomUser = async (): Promise<AxiosResponse<any>> => {
  return apiClient()
    .get(`users/random/random`)
    .then((res) => {
      return res;
    });
};

//!정보수정 요청 : 수정필요
export const patchUserInfo = (data: any): Promise<AxiosResponse<any>> => {
  return apiClient().patch(`users`, data);
};

//비밀번호 확인(ok) : 로직 점검 필요
export const checkPassowrd = (
  data: any
): Promise<AxiosResponse<Users.CoreResponse>> => {
  return apiClient().post(`users/pwdcheck`, data);
};

//비밀번호 변경 요청(ok)
export const changePassword = (
  data: Users.changePwDTO
): Promise<AxiosResponse<Users.CoreResponse>> => {
  return apiClient().post(`users/updatepwd`, data);
};

//회원탈퇴 요청(ok)
export const deleteAccount = (): Promise<AxiosResponse<Users.CoreResponse>> => {
  return apiClient().delete(`users`);
};
