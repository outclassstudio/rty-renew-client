declare namespace Users {
  interface CoreResponse {
    ok: boolean;
    error?: string;
    msg?: string;
  }

  interface UserInfoResponse extends CoreResponse {
    userInfo?: myinfoDTO;
  }

  interface FindUserResponse extends CoreResponse {
    userInfo?: otherUserDTO[];
  }

  interface myinfoDTO {
    id: number;
    userId: string;
    nickname: string;
    point: number;
    birth?: undefined | string;
    theme?: Item.singleItemDTO;
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
    userId: string;
    nickname: string;
    birth: string;
    theme: string;
  }
}
