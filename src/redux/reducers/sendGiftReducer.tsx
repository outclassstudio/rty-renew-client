import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface giftState {
  gift: {
    userFrom: string | null;
    userTo: string;
    content: string;
    svg: string;
    img: string;
    nickname: string;
  };
}

const initialState = {
  gift: {
    userFrom: "",
    userTo: "",
    content: "",
    svg: "",
    img: "",
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
    setSvg(state, action: PayloadAction<string>) {
      state.gift.svg = action.payload;
    },
    setImg(state, action: PayloadAction<string>) {
      state.gift.img = action.payload;
    },
    setNickname(state, action: PayloadAction<string>) {
      state.gift.nickname = action.payload;
    },
  },
});

export const { setFrom, setTo, setContent, setImg, setSvg, setNickname } =
  sendGiftSlice.actions;
export default sendGiftSlice.reducer;
