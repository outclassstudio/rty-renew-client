declare namespace Gift {
  interface singleGiftDTO {
    user_from: string;
    user_to: string;
    img: string;
    svg: string;
    content: string;
    status: string;
    attr: attributeDTO;
    date: string;
  }

  interface attributeDTO {
    id: number;
    x: null | number;
    y: null | number;
    status: string;
    angle?: null | number;
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
