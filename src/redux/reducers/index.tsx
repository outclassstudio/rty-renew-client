import { combineReducers } from "redux";
import spaceReducer from "./spaceReducer";

interface RootReducer {}

const rootReducer = combineReducers<RootReducer>({
  // 앞으로 생성할 리듀서 추가
  spaceReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
