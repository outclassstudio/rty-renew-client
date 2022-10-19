import { AxiosResponse } from "axios";
import apiClient from ".";

const url = "https://rty-renew-server.herokuapp.com";

//모든 아이템 불러오기
export const getAllItems = async (): Promise<
  AxiosResponse<Item.GetAllItemsResponse>
> => {
  return apiClient()
    .get(`${url}/items`)
    .then((res) => {
      return res;
    });
};

//나의 아이템 불러오기
export const getMyItems = async (): Promise<
  AxiosResponse<Item.GetMyItemsResponse>
> => {
  return apiClient()
    .get(`${url}/items/my`)
    .then((res) => {
      return res;
    });
};

//선물사기 및 포인트 차감
export const buyItem = async (
  itemId: number
): Promise<AxiosResponse<Item.BuyItemResponse>> => {
  return apiClient()
    .post(`${url}/items`, { itemId })
    .then((res) => {
      return res;
    });
};
