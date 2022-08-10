import { AxiosResponse } from "axios";
import apiClient from "./index";

const myId = localStorage.getItem("id");

//gift받아오기
export const getMyGift = async (): Promise<
  AxiosResponse<Gift.singleGiftDTO[]>
> => {
  return apiClient()
    .get(`/gift/${myId}`)
    .then((res) => {
      return res;
    });
};

//다른사람 gift받아오기
export const getOthersGift = async (
  id: string | undefined
): Promise<AxiosResponse<Gift.singleGiftDTO[]>> => {
  return apiClient()
    .get(`/gift/${id}`)
    .then((res) => {
      return res;
    });
};

//보낸선물조회
export const getSentGift = async (): Promise<
  AxiosResponse<Gift.GetSentGiftRes>
> => {
  return apiClient()
    .get(`/gifts/sent`)
    .then((res) => {
      return res;
    });
};

//space에 배치된 gift의 타입 및 속성값 변경
export const updateGift = (
  data: any //Gift.attributeDTO
): Promise<AxiosResponse<any>> => {
  return apiClient()
    .patch(`/gift/${data.idx}`, data)
    .then((res) => {
      return res;
    });
};

//space에 배치된 gift 전체 위치 변경
export const changeGiftPosition = (
  data: any //Gift.attributeDTO
): Promise<AxiosResponse<any>> => {
  return apiClient()
    .patch("/gift/update", data)
    .then((res) => {
      return res;
    });
};

//gift삭제
export const deleteGift = (data: number): Promise<AxiosResponse<any>> => {
  return apiClient().delete(`/gift/${data}/${myId}`);
};

//gift보내기
export const sendGift = (
  data: Gift.sendGiftDTO
): Promise<AxiosResponse<any>> => {
  return apiClient().post("/gift", data);
};
