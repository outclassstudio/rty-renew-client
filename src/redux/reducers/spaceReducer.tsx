import {
  IS_THEMA_MODAL,
  IS_OPEN_NEW_GIFT_BOX,
  NEW_GIFT_LIST,
  EDIT_THEMA,
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
    case IS_THEMA_MODAL:
      return { ...newState, isThemaModal: action.payload };
      break;

    case IS_OPEN_NEW_GIFT_BOX:
      return { ...newState, isOpenNewGift: action.payload };
      break;

    case EDIT_THEMA:
      return { ...newState, myThema: action.payload };
      break;

    case NEW_GIFT_LIST:
      return { ...newState, newGiftList: action.payload };
      break;

    default:
      return state;
  }
};

export default spaceReducer;
