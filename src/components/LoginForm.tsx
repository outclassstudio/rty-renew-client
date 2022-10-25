import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { BASE_URL, LOCALSTORAGE_ID, LOCALSTORAGE_TOKEN } from "../constants";
import { loginChange } from "../redux/reducers/loginReducer";
import { NormalBtn } from "../style/btnStyle.style";
import { colorSet } from "../style/global";

// axios.defaults.withCredentials = true;

export default function LoginForm() {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //로그인할 아이디 비밀번호 상태
  const [loginInfo, setLoginInfo] = useState({
    id: "",
    pwd: "",
  });

  //로그인할 아이디 비밀번호 저장함수
  const handleLoginInfo =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginInfo({ ...loginInfo, [key]: e.target.value });
    };

  //일반 로그인 요청 함수
  const handleLogin = () => {
    axios
      .post(`${BASE_URL}users/login`, {
        // .post("/users/login", {
        userId: loginInfo.id,
        pwd: loginInfo.pwd,
      })
      .then((res) => {
        if (res.data.ok) {
          localStorage.setItem(LOCALSTORAGE_TOKEN, res.data.token);
          localStorage.setItem(LOCALSTORAGE_ID, loginInfo.id);
          dispatch(loginChange());
          window.location.replace("/");
        } else {
          setIsError(true);
          setErrorMessage("아이디 또는 비밀번호를 확인해주세요");
        }
      })
      .catch(() => {
        setIsError(true);
        setErrorMessage("아이디 또는 비밀번호를 확인해주세요");
      });
  };

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <LoginItems>
          <LoginBox
            type="text"
            placeholder="아이디"
            onChange={handleLoginInfo("id")}
          ></LoginBox>
          <LoginBox
            type="password"
            placeholder="비밀번호"
            onChange={handleLoginInfo("pwd")}
          ></LoginBox>
        </LoginItems>
        <LoginItems>
          <NormalBtn
            width={"293px"}
            height={"45px"}
            className="b"
            onClick={handleLogin}
          >
            로그인
          </NormalBtn>
        </LoginItems>
        {isError ? <ErrMsg className="loginErr">{errorMessage}</ErrMsg> : ""}
      </form>
    </div>
  );
}

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

  :focus {
    outline: 2px solid ${colorSet.purple};
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
  display: flex;
  justify-content: center;
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
