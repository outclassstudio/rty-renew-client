import {
  IS_THEME_MODAL,
  IS_OPEN_NEW_GIFT_BOX,
  NEW_GIFT_LIST,
  EDIT_THEME,
  USER_INFO,
} from "../actions/index";

import { initialState } from "./initialState";

const spaceReducer: any = (
  state = initialState,
  action: {
    type: any;
    payload: any;
  }
) => {
  const newState = { ...state };
  switch (action.type) {
    case IS_THEME_MODAL:
      return { ...newState, isThemeModal: action.payload };
      break;

    case IS_OPEN_NEW_GIFT_BOX:
      return { ...newState, isOpenNewGift: action.payload };
      break;

    case EDIT_THEME:
      return { ...newState, myTheme: action.payload };
      break;

    case NEW_GIFT_LIST:
      return { ...newState, newGiftList: action.payload };
      break;

    case USER_INFO:
      return { ...newState, userInfo: action.payload };
      break;

    default:
      return state;
  }
};

export default spaceReducer;
