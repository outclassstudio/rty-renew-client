import { RootState } from "./redux/reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loginChange } from "./redux/reducers/loginReducer";
import { setFrom } from "./redux/reducers/sendGiftReducer";
import { setMyGift } from "./redux/reducers/spaceReducer";
import { getMyGift } from "./apis/giftApi";
import LoggedIn from "./routes/LoggedIn";
import LoggedOut from "./routes/LoggedOut";
import { LOCALSTORAGE_TOKEN } from "./constants";

function App() {
  const loginState = useSelector((state: RootState) => state.loginReducer);
  const dispatch = useDispatch();
  const [isGift, setIsGift] = useState(false);

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
        setIsGift(true);
      });
    }
  };

  //화면렌더링시 로그인유지 함수 실행
  useEffect(() => {
    keepLogin();
    getUserGift();
  }, []);

  //선물보내는 사람 업데이트
  useEffect(() => {
    if (loginState.login) {
      let myId = localStorage.getItem("id");
      dispatch(setFrom(myId));
    } else {
      dispatch(setFrom(""));
    }
  }, [loginState.login]);

  return loginState.login ? <LoggedIn /> : <LoggedOut />;
}

export default App;
