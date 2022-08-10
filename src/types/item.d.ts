declare namespace Item {
  interface CoreResponse {
    ok: boolean;
    error?: string;
    msg?: string;
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

  interface buyItemReqDTO {
    userId: string | null;
    itemIdx: number | null;
    point: number;
    name: string;
  }

  interface buyItemResDTO {
    user_point: number;
    user_item: singleItemDTO[];
  }
}
