import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LOCALSTORAGE_ID } from "../../constants";

interface giftState {
  gift: {
    id: number | null;
    userFrom: string | null;
    userTo: string;
    content: string;
    svgId: number | null;
    imgId: number | null;
    nickname: string;
  };
}

const initialState = {
  gift: {
    id: null,
    userFrom: localStorage.getItem(LOCALSTORAGE_ID),
    userTo: "",
    content: "",
    svgId: null,
    imgId: null,
    nickname: "",
  },
} as giftState;

//로그인 액션 및 리듀서 생성
const sendGiftSlice = createSlice({
  name: "sendGift",
  initialState,
  reducers: {
    setFrom(state, action: PayloadAction<string | null>) {
      state.gift.userFrom = action.payload;
    },
    setTo(state, action: PayloadAction<string>) {
      state.gift.userTo = action.payload;
    },
    setContent(state, action: PayloadAction<string>) {
      state.gift.content = action.payload;
    },
    setSvg(state, action: PayloadAction<number | null>) {
      state.gift.svgId = action.payload;
    },
    setImg(state, action: PayloadAction<number | null>) {
      state.gift.imgId = action.payload;
    },
    setNickname(state, action: PayloadAction<string>) {
      state.gift.nickname = action.payload;
    },
    clearSendGift(state) {
      let data = {
        id: null,
        userFrom: localStorage.getItem(LOCALSTORAGE_ID),
        userTo: "",
        content: "",
        svgId: null,
        imgId: null,
        nickname: "",
      };

      state.gift = data;
    },
  },
});

export const {
  setFrom,
  setTo,
  setContent,
  setImg,
  setSvg,
  setNickname,
  clearSendGift,
} = sendGiftSlice.actions;
export default sendGiftSlice.reducer;
