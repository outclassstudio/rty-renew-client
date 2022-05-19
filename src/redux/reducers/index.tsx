import { combineReducers } from "redux";
import spaceReducer from "./spaceReducer";
import loginReducer from "./loginReducer";
import sendGiftReducer from "./sendGiftReducer";
import getItemReducer from "./getItemReducer";

interface RootReducer {
  loginReducer: ReturnType<typeof loginReducer>;
  spaceReducer: ReturnType<typeof spaceReducer>;
  sendGiftReducer: ReturnType<typeof sendGiftReducer>;
  getItemReducer: ReturnType<typeof getItemReducer>;
}

const rootReducer = combineReducers<RootReducer>({
  // 앞으로 생성할 리듀서 추가
  spaceReducer,
  loginReducer,
  sendGiftReducer,
  getItemReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
