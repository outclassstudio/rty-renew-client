import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Space from "./pages/Space";
import Signup from "./pages/Signup";
import Userinfo from "./pages/Userinfo";
import Send from "./pages/Send";
import GiftList from "./pages/GiftList";
import Visit from "./pages/Visit";
import Find from "./pages/Find";
import Shop from "./pages/Shop";
import NotFound from "./pages/NotFound";
import { RootState } from "./redux/reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loginChange } from "./redux/reducers/loginReducer";
import { setFrom } from "./redux/reducers/sendGiftReducer";
import { setMyGift } from "./redux/reducers/spaceReducer";
import { getMyGift } from "./apis/giftApi";

function App() {
  const loginState = useSelector((state: RootState) => state.loginReducer);
  const dispatch = useDispatch();
  const [isGift, setIsGift] = useState(false);

  //로그인 유지를 위한 함수
  const keepLogin = () => {
    if (window.localStorage.getItem("token")) {
      dispatch(loginChange());
    }
  };

  const getUserGift = () => {
    if (window.localStorage.getItem("token")) {
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

  return (
    <Router>
      {loginState.login ? (
        // {loginState.login && isGift ? (
        <Routes>
          <Route path="/" element={<Space />} />
          <Route path="/userinfo" element={<Userinfo />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/send" element={<Send />} />
          <Route path="/giftlist" element={<GiftList />} />
          <Route path="/visit/:id" element={<Visit />} />
          <Route path="/find" element={<Find />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
