
import { combineReducers } from "redux";

interface RootReducer {}

const rootReducer = combineReducers<RootReducer>({
  // 앞으로 생성할 리듀서 추가
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;