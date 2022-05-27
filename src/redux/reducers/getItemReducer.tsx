import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface giftState {
  img: getSingleItem[];
  svg: getSingleItem[];
}

interface getSingleItem {
  idx: number;
  type: string;
  data: string;
  point?: number;
}

const initialState = {
  img: [],
  svg: [],
} as giftState;

//로그인 액션 및 리듀서 생성
const getItemSlice = createSlice({
  name: "getItem",
  initialState,
  reducers: {
    setGetImg(state, action: PayloadAction<getSingleItem[]>) {
      state.img = action.payload;
    },
    setGetSvg(state, action: PayloadAction<getSingleItem[]>) {
      state.svg = action.payload;
    },

    deleteStoreItems(state) {
      state.svg = [];
      state.img = [];
    },
  },
});

export const { setGetImg, setGetSvg, deleteStoreItems } = getItemSlice.actions;
export default getItemSlice.reducer;
