declare namespace Users {
  interface myinfoDTO {
    id: undefined | string;
    nickname: undefined | string;
    point: number;
    birth?: undefined | string;
  }

  interface loginDTO {
    id: string;
    pw: string;
  }
}
