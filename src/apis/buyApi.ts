import { AxiosResponse } from "axios";
import apiClient from ".";

//내아이디
const myId = localStorage.getItem("id");

//모든 아이템 불러오기
export const getItems = async (): Promise<
  AxiosResponse<Buy.singleItemDTO[]>
> => {
  return apiClient()
    .get("/item/items")
    .then((res) => {
      return res;
    });
};

//나의 아이템 불러오기
export const getMyItems = async (): Promise<
  AxiosResponse<Buy.singleItemDTO[]>
> => {
  return apiClient()
    .get(`/item/${myId}`)
    .then((res) => {
      return res;
    });
};

//선물사기 및 포인트 차감
export const buyItem = async (
  data: Buy.buyItemReqDTO
): Promise<AxiosResponse<Buy.buyItemResDTO>> => {
  return apiClient()
    .post(`/item/${myId}`, data)
    .then((res) => {
      return res;
    });
};
