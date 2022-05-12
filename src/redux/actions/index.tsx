import apiClient from "../../apis";

export const IS_THEME_MODAL = "IS_THEME_MODAL";
export const EDIT_THEME = "EDIT_THEME";
export const IS_OPEN_NEW_GIFT_BOX = "IS_OPEN_NEW_GIFT_BOX";
export const NEW_GIFT_LIST = "NEW_GIFT_LIST";
export const USER_INFO = "USER_INFO";

export function userInfo(user: any) {
  console.log(user, "uuuuuu");
  return {
    type: USER_INFO,
    payload: user,
  };
}

export function isThemeModal(boolean: boolean) {
  return {
    type: IS_THEME_MODAL,
    payload: {
      boolean,
    },
  };
}

export function isOpenNewGift(boolean: boolean) {
  return {
    type: IS_OPEN_NEW_GIFT_BOX,
    payload: {
      boolean,
    },
  };
}

export async function editTheme(theme: string) {
  //console.log("index", theme);
  const myId = localStorage.getItem("id");
  const themeResult = await apiClient()
    .patch(`/users/${myId}`, { id: myId, theme: theme })
    .then((res) => {
      return res;
    });
  console.log(themeResult, "themeResult");
  return {
    type: EDIT_THEME,
    payload: {
      theme,
    },
  };
}

export function newGiftList(item: any) {
  return {
    type: NEW_GIFT_LIST,
    payload: item,
  };
}
