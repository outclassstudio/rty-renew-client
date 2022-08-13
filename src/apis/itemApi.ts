import { AxiosResponse } from "axios";
import apiClient from ".";

//모든 아이템 불러오기
export const getAllItems = async (): Promise<
  AxiosResponse<Item.GetAllItemsResponse>
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
  itemId: number
): Promise<AxiosResponse<Item.BuyItemResponse>> => {
  console.log(itemId, "제대로 넘어가니");
  return apiClient()
    .post(`/items`, { itemId })
    .then((res) => {
      return res;
    });
};
