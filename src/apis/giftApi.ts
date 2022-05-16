import { AxiosResponse } from "axios";
import apiClient from "./index";

const myId = localStorage.getItem("id");

//gift받아오기
export const getGift = async (): Promise<
  AxiosResponse<Gift.singleGiftDTO[]>
> => {
  return apiClient()
    .get(`/gift/${myId}`)
    .then((res) => {
      return res;
    });
};

//space에 배치된 gift의 타입 및 속성값 변경
export const changeGift = (
  data: any //Gift.attributeDTO
): Promise<AxiosResponse<any>> => {
  return apiClient().patch(`/gift/${data.idx}`, data);
};

//gift삭제
export const deleteGift = (data: number): Promise<AxiosResponse<any>> => {
  return apiClient().delete(`/gift/${data}`);
};

//gift보내기
export const sendGift = (
  data: Gift.sendGiftDTO
): Promise<AxiosResponse<any>> => {
  return apiClient().post("/gift", data);
};
