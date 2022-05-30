import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userIdState {
  userId: string;
}

const initialState = {
  userId: "",
} as userIdState;

//로그인 액션 및 리듀서 생성
const findUserSlice = createSlice({
  name: "findUser",
  initialState,
  reducers: {
    FindUserIdUpdate(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  },
});

export const { FindUserIdUpdate } = findUserSlice.actions;
export default findUserSlice.reducer;
