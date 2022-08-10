declare namespace Gift {
  interface CoreResponse {
    ok: boolean;
    error?: string;
    msg?: string;
  }

  interface GetSentGiftRes extends CoreResponse {
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
    svg: number | null;
    img: number | null;
    nickname?: string;
  }
}
