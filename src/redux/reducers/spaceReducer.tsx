import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface spaceState {
  isThemeModal: boolean;
  isOpenNewGift: boolean;
  newGiftList: any;
  userInfo: Myinfo;
  myGift: any;
}

interface Myinfo {
  id: undefined | string;
  nickname: undefined | string;
  point: number;
  birth?: undefined | string;
  theme?: string;
}

const initialState = {
  isThemeModal: false,
  isOpenNewGift: false,
  newGiftList: "",
  userInfo: {
    id: "",
    nickname: "",
    point: 0,
    theme: "https://i.imgur.com/mpT71SX.jpg",
    msg: "",
  },
  myGift: undefined,
} as spaceState;

//로그인 액션 및 리듀서 생성
const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<any>) {
      state.userInfo = action.payload;
    },
    setModalOpen(state, action: PayloadAction<any>) {
      state.isThemeModal = action.payload;
    },
    setOpenNewGift(state, action: PayloadAction<any>) {
      state.isOpenNewGift = action.payload;
    },
    setMyGift(state, action: PayloadAction<any>) {
      state.myGift = action.payload;
    },
  },
});

export const { setUserInfo, setModalOpen, setOpenNewGift, setMyGift } =
  spaceSlice.actions;
export default spaceSlice.reducer;

// import {
//   IS_THEME_MODAL,
//   IS_OPEN_NEW_GIFT_BOX,
//   NEW_GIFT_LIST,
//   EDIT_THEME,
//   USER_INFO,
// } from "../actions/index";

// import { initialState } from "./initialState";

// const spaceReducer: any = (
//   state = initialState,
//   action: {
//     type: any;
//     payload: any;
//   }
// ) => {
//   const newState = { ...state };
//   switch (action.type) {
//     case IS_THEME_MODAL:
//       return { ...newState, isThemeModal: action.payload };
//       break;

//     case IS_OPEN_NEW_GIFT_BOX:
//       return { ...newState, isOpenNewGift: action.payload };
//       break;

//     case EDIT_THEME:
//       return { ...newState, myTheme: action.payload };
//       break;

//     case NEW_GIFT_LIST:
//       return { ...newState, newGiftList: action.payload };
//       break;

//     case USER_INFO:
//       return { ...newState, userInfo: action.payload };
//       break;

//     default:
//       return state;
//   }
// };

// export default spaceReducer;
