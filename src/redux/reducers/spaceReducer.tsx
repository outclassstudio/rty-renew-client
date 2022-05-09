import { IS_THEMA_MODAL } from "../actions/index";
import { EDIT_THEMA } from "../actions/index";
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

    case EDIT_THEMA:
      return { ...newState, myThema: action.payload };
      break;

    default:
      return state;
  }
};

export default spaceReducer;
