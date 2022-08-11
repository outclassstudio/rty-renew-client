declare namespace Item {
  interface CoreResponse {
    ok: boolean;
    error?: string;
    msg?: string;
  }

  interface GetAllItemsResponse extends CoreResponse {
    items?: singleItemDTO[];
  }

  interface GetMyItemsResponse extends CoreResponse {
    myItems?: singleItemDTO[];
  }

  interface singleItemDTO {
    idx: number;
    type: string;
    data: string;
    point?: number;
    name?: string;
  }

  interface buyItemResDTO {
    user_point: number;
    user_item: singleItemDTO[];
  }
}
