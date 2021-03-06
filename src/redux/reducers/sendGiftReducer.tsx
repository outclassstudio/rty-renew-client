import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface giftState {
  gift: {
    userFrom: string | null;
    userTo: string;
    content: string;
    svg: number | null;
    img: number | null;
    nickname: string;
  };
}

const initialState = {
  gift: {
    userFrom: window.localStorage.getItem("id"),
    userTo: "",
    content: "",
    svg: null,
    img: null,
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
      state.gift.svg = action.payload;
    },
    setImg(state, action: PayloadAction<number | null>) {
      state.gift.img = action.payload;
    },
    setNickname(state, action: PayloadAction<string>) {
      state.gift.nickname = action.payload;
    },
    clearSendGift(state) {
      let data = {
        userFrom: window.localStorage.getItem("id"),
        userTo: "",
        content: "",
        svg: null,
        img: null,
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
