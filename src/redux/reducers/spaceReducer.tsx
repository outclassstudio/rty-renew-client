import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface spaceState {
  isThemeModal: boolean;
  isOpenNewGift: boolean;
  newGiftList: any;
  storageGiftList: any;
  spaceGiftList: any;
  userInfo: Myinfo;
  myGift: any;
  isOpenStorage: boolean;
  isConfirmModal: boolean;
  isConfirmRes: boolean;
  isOpenGiftBox: boolean;
  clickGiftBox: string;
  clickBtn: string;
  isOpenTrash: boolean;
  isOpenSave: boolean;
  isCliked: boolean;
  isRandom: boolean;
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
    theme: "",
    msg: "",
  },
  isOpenStorage: false,
  myGift: undefined,
  isConfirmModal: false,
  isConfirmRes: false,
  isOpenGiftBox: false,
  clickGiftBox: "",
  clickBtn: "",
  isOpenTrash: false,
  isOpenSave: false,
  storageGiftList: "",
  spaceGiftList: "",
  isCliked: false,
  isRandom: false,
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
    setStorageGift(state, action: PayloadAction<any>) {
      state.storageGiftList = action.payload;
    },
    setSpaceGift(state, action: PayloadAction<any>) {
      state.spaceGiftList = action.payload;
    },
    setNewGift(state, action: PayloadAction<any>) {
      state.newGiftList = action.payload;
    },
    setOpenStorage(state, action: PayloadAction<any>) {
      state.isOpenStorage = action.payload;
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
    setClickGiftBox(state, action: PayloadAction<any>) {
      state.clickGiftBox = action.payload;
    },
    setClickBtn(state, action: PayloadAction<any>) {
      state.clickBtn = action.payload;
    },
    setIsOpenTrash(state, action: PayloadAction<any>) {
      state.isOpenTrash = action.payload;
    },
    setIsOpenSave(state, action: PayloadAction<any>) {
      state.isOpenSave = action.payload;
    },
    setIsClicked(state, action: PayloadAction<any>) {
      state.isCliked = action.payload;
    },
    setIsRandom(state, action: PayloadAction<any>) {
      state.isRandom = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setModalOpen,
  setOpenNewGift,
  setMyGift,
  setOpenStorage,
  setConfirmModal,
  setConfirmRes,
  setOpenGiftBox,
  setClickGiftBox,
  setClickBtn,
  setIsOpenSave,
  setIsOpenTrash,
  setStorageGift,
  setNewGift,
  setSpaceGift,
  setIsClicked,
  setIsRandom,
} = spaceSlice.actions;
export default spaceSlice.reducer;
