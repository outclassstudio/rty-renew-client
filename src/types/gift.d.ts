declare namespace Gift {
  interface CoreResponse {
    ok: boolean;
    error?: string;
    msg?: string;
  }

  interface GetGiftResponse extends CoreResponse {
    gift?: singleGiftDTO[];
  }

  interface GetSentGiftResponse extends CoreResponse {
    gift?: singleGiftDTO[];
  }

  interface singleGiftDTO {
    idx: number;
    userFrom: string;
    userTo: string;
    img: string;
    svg: string;
    content: string;
    status: string;
    svgAttr?: attributeDTO;
    date?: string;
  }

  interface attributeDTO {
    x: number;
    y: number;
    rotate: number;
  }

  interface sendGiftDTO {
    userFrom: string | null;
    userTo: string;
    content: string;
    svgId: number | null;
    imgId: number | null;
    nickname?: string;
  }

  interface IChangeData {
    id: number;
    svgAttr?: {
      x: number;
      y: number;
      rotate: number;
    };
    status?: string;
  }
}
