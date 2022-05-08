import { AxiosResponse } from "axios";
import apiClient from ".";

//내아이디
const myId = localStorage.getItem("id");

//모든 아이템 불러오기
export const getItems = (): Promise<AxiosResponse<Buy.singleItemDTO[]>> => {
  return apiClient()
    .get("/buy/items")
    .then((res) => {
      return res.data;
    });
};

//나의 아이템 불러오기
export const getMyItems = (): Promise<AxiosResponse<Buy.singleItemDTO[]>> => {
  return apiClient()
    .get(`/buy/${myId}`)
    .then((res) => {
      return res.data;
    });
};

//선물사기 및 포인트 차감
export const buyItem = (
  data: Buy.buyItemReqDTO
): Promise<AxiosResponse<Buy.buyItemResDTO>> => {
  return apiClient()
    .post(`/buy/${myId}`, data)
    .then((res) => {
      return res.data;
    });
};
