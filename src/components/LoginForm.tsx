import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { loginChange } from "../redux/actions/loginActions";

axios.defaults.withCredentials = true;

export const LoginItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.6rem;
  > a {
    text-decoration: none;
  }
  > a:visited {
    color: #4c4c4c;
    text-decoration: none;
  }
`;

export const LoginBox = styled.input`
  width: 280px;
  height: 45px;
  padding-left: 10px;
  border-radius: 0.1rem;
  border: 1px solid #a5a5a5;
  box-shadow: 1px 1px 1px #6969692d;
  margin-bottom: 0.25rem;
`;

export const LoginBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 293px;
  height: 45px;
  color: white;
  border: none;
  /* box-shadow: 1px 1px 1px #6969693d; */
  /* border: 0.1px solid #a5a5a575; */
  border-radius: 0.1rem;
  cursor: pointer;
  margin-bottom: 0.3rem;
  background: linear-gradient(to right, #ec047a 30%, #b22490 100%);

  :active {
    box-shadow: inset 2px 2px 2px 1px rgba(0, 0, 0, 0.4);
  }
`;

export const LoginText = styled.div`
  margin-top: 0.1rem;
  font-size: 15px;
  margin-bottom: 0.15rem;
  color: #3d3d3d;
  &:hover {
    color: #131db3;
  }
  a {
    text-decoration: none;
  }
  a:visitied {
    text-decoration: none;
  }
`;

export const ErrMsg = styled.div`
  margin-top: 3px;
  font-size: 13px;
  &.err {
    color: #c40202;
  }
  &.ok {
    color: #0e7a00;
  }
  &.loginErr {
    color: #c40202;
    margin-top: 0px;
    margin-bottom: 5px;
  }
  &.centered {
    color: #c40202;
    text-align: center;
  }
`;

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //로그인할 아이디 비밀번호 상태
  const [loginInfo, setLoginInfo] = useState({
    userId: "",
    password: "",
  });

  //로그인할 아이디 비밀번호 저장함수
  const handleLoginInfo =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo({ ...loginInfo, [key]: e.target.value });
    };

  //일반 로그인 요청 함수
  const handleLogin = () => {
    // axios
    //   .post("http://192.168.10.156:8080/users/login", {
    //     userId: loginInfo.userId,
    //     password: loginInfo.password,
    //   })
    //   .then((res) => {
    //     window.localStorage.setItem("token", res.data.accessToken);
    //     dispatch(loginChange());
    //     navigate("/");
    //   })
    //   .catch(() => {
    //     setIsError(true);
    //     setErrorMessage("아이디 또는 비밀번호를 확인해주세요");
    //   });

    dispatch(loginChange());
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <LoginItems>
          <LoginBox
            type="text"
            placeholder="아이디"
            onChange={handleLoginInfo("userId")}
          ></LoginBox>
          <LoginBox
            type="password"
            placeholder="비밀번호"
            onChange={handleLoginInfo("password")}
          ></LoginBox>
        </LoginItems>
        <LoginItems>
          <LoginBtn onClick={handleLogin}>로그인</LoginBtn>
        </LoginItems>
        {isError ? <ErrMsg className="loginErr">{errorMessage}</ErrMsg> : ""}
      </form>
    </div>
  );
}
