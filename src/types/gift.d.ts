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
    svgAttr: attributeDTO | number;
    date?: string;
  }

  interface attributeDTO {
    //idx: number;
    //x: null | number;
    //y: null | number;
    //status: string;
    //angle?: null | number;
  }

  interface sendGiftDTO {
    userFrom: string | null;
    userTo: string;
    content: string;
    svgId: number | null;
    imgId: number | null;
    nickname?: string;
  }
}
