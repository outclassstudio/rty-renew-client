declare namespace Users {
  interface myinfoDTO {
    id: string;
    nickname: string;
    point: number;
    birth?: string;
  }

  interface loginDTO {
    id: string;
    pw: string;
  }
}
