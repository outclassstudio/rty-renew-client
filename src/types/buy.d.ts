declare namespace Buy {
  interface singleItemDTO {
    idx: number;
    type: string;
    data: string;
    point?: number;
    name?: string;
  }

  interface buyItemReqDTO {
    userId: strin | null;
    itemIdx: number | null;
    point: number;
    name: string;
  }

  interface buyItemResDTO {
    user_point: number;
    user_item: singleItemDTO[];
  }
}
