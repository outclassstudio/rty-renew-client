import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Space from "./pages/Space";
import Signup from "./pages/Signup";
import Userinfo from "./pages/Userinfo";
import Send from "./pages/Send";
import ShopRoutes from "./routes/ShopRoutes";
import { RootState } from "./redux/reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginChange } from "./redux/actions/loginActions";
import { useEffect } from "react";

function App() {
  const loginState = useSelector((state: RootState) => state.loginReducer);
  const dispatch = useDispatch();

  //로그인 유지를 위한 함수
  const keepLogin = () => {
    if (window.localStorage.getItem("token")) {
      dispatch(loginChange());
    }
  };

  //화면렌더링시 로그인유지 함수 실행
  // useEffect(() => {
  //   keepLogin();
  // }, []);

  return (
    <Router>
      <Routes>
        {loginState.login ? (
          <Route path="/" element={<Space />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}

        <Route path="/space" element={<Space />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/userinfo" element={<Userinfo />} />
        <Route path="/shop/*" element={<ShopRoutes />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </Router>
  );
}

export default App;
