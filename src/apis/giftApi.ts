import { AxiosResponse } from "axios";
import apiClient from "./index";

//gift받아오기(ok)
export const getMyGift = async (): Promise<
  AxiosResponse<Gift.GetGiftResponse>
> => {
  return apiClient()
    .get(`/gifts`)
    .then((res) => {
      return res;
    });
};

//다른사람 gift받아오기(ok)
export const getOthersGift = async (
  id: string | undefined
): Promise<AxiosResponse<Gift.GetGiftResponse>> => {
  return apiClient()
    .get(`/gifts/${id}`)
    .then((res) => {
      return res;
    });
};

//보낸선물조회(ok)
export const getSentGift = async (): Promise<
  AxiosResponse<Gift.GetSentGiftResponse>
> => {
  return apiClient()
    .get(`/gifts/sent`)
    .then((res) => {
      return res;
    });
};

//!space에 배치된 gift의 타입 및 속성값 변경 : 정리필요
export const updateGift = (
  data: any //Gift.attributeDTO
): Promise<AxiosResponse<any>> => {
  return apiClient()
    .patch(`/gifts`, data)
    .then((res) => {
      return res;
    });
};

//!space에 배치된 gift 전체 위치 변경 : 삭제예정
export const changeGiftPosition = (
  data: any //Gift.attributeDTO
): Promise<AxiosResponse<any>> => {
  return apiClient()
    .patch("/gifts/update", data)
    .then((res) => {
      return res;
    });
};

//gift삭제(ok)
export const deleteGift = (giftId: number): Promise<AxiosResponse<any>> => {
  return apiClient().delete(`/gifts/${giftId}`);
};

//!gift보내기
export const sendGift = (
  data: Gift.sendGiftDTO
): Promise<AxiosResponse<any>> => {
  return apiClient().post("/gifts", data);
};
