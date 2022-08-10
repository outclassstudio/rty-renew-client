import { AxiosResponse } from "axios";
import apiClient from ".";

//내아이디
const myId = localStorage.getItem("id");

//모든 아이템 불러오기
export const getAllItems = async (): Promise<
  AxiosResponse<Item.singleItemDTO[]>
> => {
  return apiClient()
    .get("/items")
    .then((res) => {
      return res;
    });
};

//나의 아이템 불러오기
export const getMyItems = async (): Promise<
  AxiosResponse<Item.GetMyItemsResponse>
> => {
  return apiClient()
    .get(`/items/my`)
    .then((res) => {
      return res;
    });
};

//선물사기 및 포인트 차감
export const buyItem = async (
  data: Item.buyItemReqDTO
): Promise<AxiosResponse<Item.buyItemResDTO>> => {
  return apiClient()
    .post(`/items/${myId}`, data)
    .then((res) => {
      return res;
    });
};
