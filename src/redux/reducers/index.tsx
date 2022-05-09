import { combineReducers } from "redux";
import spaceReducer from "./spaceReducer";
import loginReducer from "./loginReducer";

interface RootReducer {
  loginReducer: ReturnType<typeof loginReducer>;
  spaceReducer: ReturnType<typeof spaceReducer>;
}

const rootReducer = combineReducers<RootReducer>({
  // 앞으로 생성할 리듀서 추가
  spaceReducer,
  loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
