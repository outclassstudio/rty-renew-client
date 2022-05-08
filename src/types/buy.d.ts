declare namespace Buy {
  interface singleItemDTO {
    type: string;
    data: string;
    point?: number;
  }

  interface buyItemReqDTO {
    type: string;
    id: number;
  }

  interface buyItemResDTO {
    user_point: number;
    user_item: singleItemDTO[];
  }
}
