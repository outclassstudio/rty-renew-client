import { createSlice } from "@reduxjs/toolkit";

interface loginState {
  login: boolean;
}

const initialState = {
  login: false,
} as loginState;

//로그인 액션 및 리듀서 생성
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginChange(state) {
      state.login = true;
    },
    logoutChange(state) {
      state.login = false;
    },
  },
});

export const { loginChange, logoutChange } = loginSlice.actions;
export default loginSlice.reducer;
