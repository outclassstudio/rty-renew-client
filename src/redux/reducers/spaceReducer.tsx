import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface spaceState {
  isThemeModal: boolean;
  userInfo: Myinfo;
  myGift: any;
  newGift: any;
  isConfirmModal: boolean;
  isConfirmRes: boolean;
  isOpenGiftBox: boolean;
  // clickGiftBox: string;
  isCliked: boolean;
  defaultItem: any;
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
  newGiftList: "",
  userInfo: {
    id: "",
    nickname: "",
    point: 0,
    theme: "",
    msg: "",
  },
  myGift: null,
  newGift: null,
  isConfirmModal: false,
  isConfirmRes: false,
  isOpenGiftBox: false,
  // clickGiftBox: "",
  storageGiftList: "",
  spaceGiftList: "",
  isCliked: false,
  defaultItem: "",
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
    setMyGift(state, action: PayloadAction<any>) {
      state.myGift = action.payload;
    },
    setNewGift(state, action: PayloadAction<any>) {
      state.newGift = action.payload;
    },
    setConfirmModal(state, action: PayloadAction<any>) {
      state.isConfirmModal = action.payload;
    },
    setConfirmRes(state, action: PayloadAction<any>) {
      state.isConfirmRes = action.payload;
    },
    setOpenGiftBox(state, action: PayloadAction<any>) {
      state.isOpenGiftBox = action.payload;
    },
    // setClickGiftBox(state, action: PayloadAction<any>) {
    //   state.clickGiftBox = action.payload;
    // },
    setIsClicked(state, action: PayloadAction<any>) {
      state.isCliked = action.payload;
    },
    setDefaultItem(state, action: PayloadAction<any>) {
      state.defaultItem = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setModalOpen,
  setMyGift,
  setNewGift,
  setConfirmModal,
  setConfirmRes,
  setOpenGiftBox,
  // setClickGiftBox,
  setIsClicked,
  setDefaultItem,
} = spaceSlice.actions;
export default spaceSlice.reducer;
