declare namespace Users {
  interface myinfoDTO {
    id: undefined | string;
    nickname: undefined | string;
    point: number;
    birth?: undefined | string;
    theme?: string | undefined;
    msg?: string | undefined;
  }

  interface loginDTO {
    id: string;
    pw: string;
  }

  interface changePwDTO {
    id: string | null;
    npwd: string;
  }

  interface otherUserDTO {
    id: string;
    nickname: string;
    birth: string;
    theme: string;
  }
}
