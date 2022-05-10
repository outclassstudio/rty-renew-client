export const IS_THEMA_MODAL = "IS_THEMA_MODAL";
export const EDIT_THEMA = "EDIT_THEMA";
export const IS_OPEN_NEW_GIFT_BOX = "IS_OPEN_NEW_GIFT_BOX";
export const NEW_GIFT_LIST = "NEW_GIFT_LIST";

export function isThemaModal(boolean: boolean) {
  return {
    type: IS_THEMA_MODAL,
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

export function editThema(thema: string) {
  console.log("index", thema);
  return {
    type: EDIT_THEMA,
    payload: {
      thema,
    },
  };
}

export function newGiftList(item: any) {
  console.log("index", item);
  return {
    type: NEW_GIFT_LIST,
    payload: item,
  };
}
