import { RootState } from "./redux/reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginChange } from "./redux/reducers/loginReducer";
import { setFrom } from "./redux/reducers/sendGiftReducer";
import {
  setDefaultItem,
  setMyGift,
  setUserInfo,
} from "./redux/reducers/spaceReducer";
import { getMyGift } from "./apis/giftApi";
import LoggedIn from "./routes/LoggedIn";
import LoggedOut from "./routes/LoggedOut";
import { LOCALSTORAGE_ID, LOCALSTORAGE_TOKEN } from "./constants";
import { getAllItems } from "./apis/itemApi";
import { getMyInfo } from "./apis/userApi";

function App() {
  const loginState = useSelector((state: RootState) => state.loginReducer);
  const dispatch = useDispatch();

  //로그인 유지를 위한 함수
  const keepLogin = () => {
    if (localStorage.getItem(LOCALSTORAGE_TOKEN)) {
      dispatch(loginChange());
    }
  };

  const getUserGift = () => {
    if (localStorage.getItem(LOCALSTORAGE_TOKEN)) {
      getMyGift().then((res) => {
        dispatch(setMyGift(res.data.gift));
      });
    }
  };

  //화면렌더링시 로그인유지 함수 실행
  useEffect(() => {
    keepLogin();
  }, []);

  //선물보내는 사람 업데이트
  useEffect(() => {
    if (loginState.login) {
      getAllItems().then((res) => {
        if (res.data.items) {
          let defaultItem = res.data.items.filter(
            (el) => el.type === "default"
          );
          dispatch(setDefaultItem(defaultItem));
        }
        getUserGift();
      });

      getMyInfo().then((res) => {
        let user = res.data.userInfo;
        if (user) {
          dispatch(setUserInfo(user));
        }
      });

      let myId = localStorage.getItem(LOCALSTORAGE_ID);
      dispatch(setFrom(myId));
    } else {
      dispatch(setFrom(""));
    }
  }, [loginState.login]);

  return loginState.login ? <LoggedIn /> : <LoggedOut />;
}

export default App;
