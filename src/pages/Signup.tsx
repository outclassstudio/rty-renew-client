import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { fadeAction } from "../style/global";

axios.defaults.withCredentials = true;

export default function Signup() {
  const navigate = useNavigate();

  //회원가입 정보
  const [signUpInfo, setSignUpInfo] = useState({
    userId: "",
    nickname: "",
    password: "",
    passwordCheck: "",
    birth: "",
  });

  //에러상태묶음
  const [errors, setErrors] = useState({
    idOverlap: false,
    permitSignUpBtn: false,
    emptyBoxCheck: false,
    emailValidCheck: false,
    permitAuthNumBox: false,
    authCodeErr: false,
    recaptcha: false,
  });

  //메세지 렌더링 상태
  const [messageRender, setMessageRender] = useState(false);

  //회원가입 정보를 변경하는 함수
  const handleSignUpValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
      // console.log(signUpInfo);
    };

  //아이디 중복 검사 함수
  const handleIdCheck = (): void => {
    // axios
    //   .get(`http://192.168.10.153:8080/users/checkid/${signUpInfo.userId}`)
    //   .then((res) => {
    //     setMessageRender(true);
    //     setErrors({ ...errors, idOverlap: res.data.result });
    //   })
    //   .catch(() => {
    //     setMessageRender(true);
    //     setErrors({ ...errors, idOverlap: true });
    //   });
  };

  //ID가 이미 존재할 경우 작동하는 함수
  const idMatchConfirm = (): boolean => {
    if (errors.idOverlap) {
      return true;
    } else {
      return false;
    }
  };

  //ID가 이미 존재할경우 아이디 입력칸 하단에 에러메시지 표시하는 함수
  const renderIdCheckMessage = () => {
    if (signUpInfo.userId && idMatchConfirm()) {
      return <ErrMsg className="err">이미 존재하는 아이디입니다</ErrMsg>;
    } else if (signUpInfo.userId && !idMatchConfirm()) {
      return <ErrMsg className="ok">사용 가능한 아이디입니다</ErrMsg>;
    } else {
      setMessageRender(false);
    }
  };

  //비밀번호 유효성 검사 함수
  const strongPassword = (str: string): boolean => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(str);
  };

  //유효성체크해서 에러여부 리턴하는 함수
  const validationConfirm = (): boolean => {
    if (strongPassword(signUpInfo.password)) {
      return true;
    } else {
      return false;
    }
  };

  //비밀번호 유효성 검사 결과 렌더링하는 함수
  const renderValidationCheckMessage = () => {
    if (signUpInfo.password !== "" && !validationConfirm()) {
      return <ErrMsg className="err">유효하지 않은 비밀번호입니다</ErrMsg>;
    }
  };

  //비밀번호 일치여부 판단하는 함수
  const passwordMatchConfirm = (): boolean => {
    if (signUpInfo.password === signUpInfo.passwordCheck) {
      return true;
    } else {
      return false;
    }
  };

  //비밀번호 불일치 오류메세지를 렌더하는 함수
  const renderFeedbackMessage = () => {
    if (!passwordMatchConfirm()) {
      return <ErrMsg className="err">패스워드가 일치하지 않습니다</ErrMsg>;
    }
  };

  //빈칸있을 경우 메시지 렌더 함수
  const renderEmptyBoxCheck = () => {
    return <ErrMsg className="err">필수정보입니다</ErrMsg>;
  };

  //회원가입 서버에 요청하는 함수
  const handleSignUp = () => {
    setErrors({ ...errors, emptyBoxCheck: true });
    if (
      strongPassword(signUpInfo.password) &&
      signUpInfo.password !== "" &&
      signUpInfo.passwordCheck !== "" &&
      signUpInfo.password === signUpInfo.passwordCheck
    ) {
      axios
        .post("http://192.168.10.153:8080/users/signup", {
          id: signUpInfo.userId,
          nickname: signUpInfo.nickname,
          pwd: signUpInfo.password,
          birth: signUpInfo.birth,
        })
        .then((res) => {
          // swal({
          //   title: "회원가입 성공!",
          //   icon: "success",
          // });
          console.log(res);
          navigate("/");
        });
    }
    //  .catch(() => {
    //   setIsError(true);
    // })
  };

  return (
    <MainContainer>
      <Logo
        src="https://i.imgur.com/ITptV6p.png"
        title="logo_sample(png).png"
        onClick={() => navigate("/")}
      />
      <SignUpWrapper onSubmit={(e) => e.preventDefault()}>
        <SubWrapper>
          <SignUpItems>
            <SignUpText>
              아이디 <span>*</span>
            </SignUpText>
            <SignUpSubItem>
              <SignUpBox
                className="sub"
                type="text"
                onChange={handleSignUpValue("userId")}
              ></SignUpBox>
              <SignUpBtn onClick={handleIdCheck} className="c">
                <span>아이디</span>
                <br></br>
                <span> 중복확인</span>
              </SignUpBtn>
            </SignUpSubItem>
            {messageRender ? renderIdCheckMessage() : ""}
            {errors.emptyBoxCheck
              ? signUpInfo.userId === ""
                ? renderEmptyBoxCheck()
                : ""
              : ""}
          </SignUpItems>
          <SignUpItems>
            <SignUpText>
              닉네임 <span>*</span>
            </SignUpText>
            <SignUpBox
              type="text"
              onChange={handleSignUpValue("nickname")}
            ></SignUpBox>
            {errors.emptyBoxCheck
              ? signUpInfo.nickname === ""
                ? renderEmptyBoxCheck()
                : ""
              : ""}
          </SignUpItems>
          <SignUpItems>
            <SignUpText>
              비밀번호 <span>*</span>
            </SignUpText>
            <SignUpText className="sub">
              * 6자 이상, 영어, 숫자를 포함한 비밀번호
            </SignUpText>
            <SignUpBox
              type="password"
              onChange={handleSignUpValue("password")}
            ></SignUpBox>
            {errors.emptyBoxCheck
              ? signUpInfo.password === ""
                ? renderEmptyBoxCheck()
                : ""
              : ""}
            {renderValidationCheckMessage()}
          </SignUpItems>
          <SignUpItems>
            <SignUpText>
              비밀번호확인 <span>*</span>
            </SignUpText>
            <SignUpBox
              type="password"
              onChange={handleSignUpValue("passwordCheck")}
            ></SignUpBox>
            {renderFeedbackMessage()}
          </SignUpItems>
          <SignUpItems>
            <SignUpText>생년월일</SignUpText>
            <SignUpBox
              type="text"
              onChange={handleSignUpValue("birth")}
            ></SignUpBox>
          </SignUpItems>
        </SubWrapper>
        <SignUpBtn className="a" onClick={handleSignUp}>
          회원가입
        </SignUpBtn>
      </SignUpWrapper>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  gap: 10px;
  animation: 0.7s ease-in-out ${fadeAction};
`;

const Logo = styled.img`
  width: 320px;
  cursor: pointer;
`;

export const SignUpWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SubWrapper = styled.div`
  padding: 20px 30px 20px 30px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #4c3e9f;
`;

export const SignUpItems = styled.div`
  margin: 0.8rem 0.8rem 0.8rem 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  color: white;

  &.sub {
    margin: 0.8rem 0.8rem 0.8rem 0.8rem;
  }
`;

export const SignUpSubItem = styled.div`
  display: flex;
  &.timer {
    margin-top: 5px;
    font-size: 14px;
    color: #c40000;
  }
`;

export const SignUpBox = styled.input`
  width: 300px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin-bottom: 0.25rem;
  &.sub {
    width: 191px;
    margin-right: 8px;
    margin-bottom: 0px;
  }
`;

export const SignUpText = styled.div`
  font-weight: bold;

  &.sub {
    font-size: 12px;
    font-weight: 340;
  }

  span {
    color: #ff8352;
  }
`;

export const SignUpBtn = styled.button`
  width: 313px;
  height: 43px;
  color: white;
  box-shadow: 1px 1px 1px #696969;
  border: 0px solid #a5a5a5;
  cursor: pointer;
  margin-bottom: 0.5rem;

  &.a {
    margin-top: 1rem;
    background-color: #5c5c5c;
  }

  &.b {
    background-color: #7c7c7c;
  }

  &.c {
    width: 100px;
    background-color: #7c7c7c;
    margin-bottom: 0rem;
  }
`;

export const ErrMsg = styled.div`
  margin-top: 3px;
  font-size: 13px;
  &.err {
    color: #ff8352;
  }
  &.ok {
    color: #0e7a00;
  }
  &.loginErr {
    color: #ff8352;
    margin-top: 0px;
    margin-bottom: 5px;
  }
  &.centered {
    color: #ff8352;
    text-align: center;
  }
`;
