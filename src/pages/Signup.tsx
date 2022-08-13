import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { NormalBtn } from "../style/btnStyle.style";
import { colorSet, DropdonwBg, fadeAction } from "../style/global";
import MyPicker from "../components/MyPicker";
import Swal from "sweetalert2";
import { idCheck, strongPassword, nickNameCheck } from "../hooks/validation";
import useDate from "../hooks/useDate";

// axios.defaults.withCredentials = true;

export default function Signup() {
  const navigate = useNavigate();
  const now = useDate();

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
    idOverlap: true,
    emptyBoxCheck: false,
  });

  //메세지 렌더링 상태
  const [messageRender, setMessageRender] = useState(false);

  //데이트피커 on/off상태
  const [activePicker, setActivePicker] = useState(false);

  //회원가입 정보를 변경하는 함수
  const handleSignUpValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignUpInfo({ ...signUpInfo, [key]: e.target.value });
    };

  //날짜를 변경하는 함수
  const handleDateValue = (date: string) => {
    if (now.now < date) {
      Swal.fire({
        title: "미래 날짜는 입력할 수 없어요",
        icon: "warning",
        confirmButtonText: "닫기",
      });
    } else {
      setSignUpInfo({ ...signUpInfo, birth: date });
    }
  };

  //아이디 중복 검사 함수
  const handleIdCheck = (): void => {
    if (idCheck(signUpInfo.userId)) {
      axios
        .get(`/users/checkid/${signUpInfo.userId}`)
        .then((res) => {
          setMessageRender(true);
          setErrors({ ...errors, idOverlap: res.data.ok });
        })
        .catch(() => {
          setMessageRender(true);
          setErrors({ ...errors, idOverlap: true });
        });
    }
  };

  //아이디가 이미 존재할경우 에러메시지 표시하는 함수
  const renderIdCheckMessage = () => {
    if (signUpInfo.userId && errors.idOverlap) {
      return <ErrMsg className="err">이미 존재하는 아이디입니다</ErrMsg>;
    } else if (signUpInfo.userId && !errors.idOverlap) {
      return <ErrMsg className="ok">사용 가능한 아이디입니다</ErrMsg>;
    } else {
      setMessageRender(false);
    }
  };

  //아이디 유효성 검사 에러 메시지
  const renderIdValidCheckMsg = () => {
    if (signUpInfo.userId !== "" && !idCheck(signUpInfo.userId)) {
      return <ErrMsg className="err">유효하지 않은 아이디 입니다</ErrMsg>;
    }
  };

  //닉네임유효성 검사 결과 렌더링하는 함수
  const renderNicknameValidCheckMessage = () => {
    if (
      (signUpInfo.nickname !== "" && nickNameCheck(signUpInfo.nickname)) ||
      signUpInfo.nickname.length > 10
    ) {
      return <ErrMsg className="err">유효하지 않은 닉네임입니다</ErrMsg>;
    }
  };

  //비밀번호 유효성 검사 결과 렌더링하는 함수
  const renderValidationCheckMessage = () => {
    if (signUpInfo.password !== "" && !strongPassword(signUpInfo.password)) {
      return <ErrMsg className="err">유효하지 않은 비밀번호입니다</ErrMsg>;
    }
  };

  //비밀번호 불일치 오류메세지를 렌더하는 함수
  const renderFeedbackMessage = () => {
    if (signUpInfo.password !== signUpInfo.passwordCheck) {
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
      !errors.idOverlap &&
      idCheck(signUpInfo.userId) &&
      strongPassword(signUpInfo.password) &&
      !nickNameCheck(signUpInfo.nickname) &&
      signUpInfo.password !== "" &&
      signUpInfo.passwordCheck !== "" &&
      signUpInfo.password === signUpInfo.passwordCheck
    ) {
      axios
        .post("/users/signup", {
          userId: signUpInfo.userId,
          nickname: signUpInfo.nickname,
          pwd: signUpInfo.password,
          birth: signUpInfo.birth,
        })
        .then((res) => {
          if (res.data.ok) {
            Swal.fire({
              title: "회원가입 성공!",
              icon: "success",
              confirmButtonText: "닫기",
            }).then((result) => {
              if (result) {
                navigate("/");
              }
            });
          } else {
            console.log(res.data);
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "입력을 확인해주세요",
            text: `${err.response.data}`,
            icon: "warning",
            confirmButtonText: "닫기",
          });
        });
    } else {
      if (!messageRender) {
        Swal.fire({
          title: "아이디 중복검사를 해주세요",
          icon: "warning",
          confirmButtonText: "닫기",
        });
      } else {
        Swal.fire({
          title: "입력에 문제가 없는지 확인해주세요",
          icon: "warning",
          confirmButtonText: "닫기",
        });

        if (!idCheck(signUpInfo.userId)) {
          setErrors({ ...errors, idOverlap: true });
        }
      }
    }
  };

  //날짜선택 on/off함수
  const handleAcitvePicker = () => {
    setActivePicker((prev) => !prev);
  };

  return (
    <MainContainer>
      <Logo
        src="https://cdn.discordapp.com/attachments/974114424036155505/978189535957614592/main_logo.png"
        title="logo_sample(png).png"
        onClick={() => navigate("/")}
      />
      <SignUpWrapper onSubmit={(e) => e.preventDefault()}>
        <SubWrapper>
          <SignUpItems>
            <SignUpText>
              아이디 <span>*</span>
            </SignUpText>
            <SignUpText className="sub">
              * 4자 이상 10자 이하의 영어 또는 숫자를 포함한 아이디
            </SignUpText>
            <SignUpSubItem>
              <SignUpBox
                className="sub"
                type="text"
                onChange={handleSignUpValue("userId")}
              ></SignUpBox>
              <NormalBtn
                height={"45px"}
                width={"100px"}
                onClick={handleIdCheck}
                className="a"
              >
                <span>아이디</span>
                <span>중복확인</span>
              </NormalBtn>
            </SignUpSubItem>
            {renderIdValidCheckMsg()}
            {messageRender ? renderIdCheckMessage() : ""}
            {errors.emptyBoxCheck
              ? signUpInfo.userId === ""
                ? renderEmptyBoxCheck()
                : ""
              : ""}
          </SignUpItems>
          {activePicker ? (
            <PickerWrapper>
              <MyPicker
                handleAcitvePicker={handleAcitvePicker}
                handleDateValue={handleDateValue}
              />
              <DropdonwBg onClick={handleAcitvePicker} />
            </PickerWrapper>
          ) : (
            ""
          )}
          <SignUpItems>
            <SignUpText>
              닉네임 <span>*</span>
            </SignUpText>
            <SignUpText className="sub">* 10자 이하의 닉네임</SignUpText>
            <SignUpBox
              type="text"
              onChange={handleSignUpValue("nickname")}
            ></SignUpBox>
            {errors.emptyBoxCheck
              ? signUpInfo.nickname === ""
                ? renderEmptyBoxCheck()
                : ""
              : ""}
            {renderNicknameValidCheckMessage()}
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
            <SignUpSubItem>
              <SignUpDiv className="sub">{signUpInfo.birth}</SignUpDiv>
              <NormalBtn
                height={"45px"}
                width={"100px"}
                onClick={handleAcitvePicker}
                className="a"
              >
                날짜선택
              </NormalBtn>
            </SignUpSubItem>
          </SignUpItems>
        </SubWrapper>
        <NormalBtn
          className="b"
          width="313px"
          height="43px"
          onClick={handleSignUp}
        >
          회원가입
        </NormalBtn>
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
  background-image: url("https://cdn.discordapp.com/attachments/974114424036155505/976650594225909760/background3.png");
  background-position: center;
  background-size: cover;
`;

const Logo = styled.img`
  width: 320px;
  cursor: pointer;
  animation: 0.7s ease-in-out ${fadeAction};
`;

export const SignUpWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: 0.7s ease-in-out ${fadeAction};
`;

const SubWrapper = styled.div`
  padding: 20px 35px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #4c3e9f;
  margin-bottom: 15px;
`;

export const SignUpItems = styled.div`
  margin: 0.8rem 0.8rem 0.8rem 0.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  color: white;
  /* gap: 3px; */

  &.sub {
    margin: 0.8rem 0.8rem 0.8rem 0.8rem;
  }
`;

export const SignUpSubItem = styled.div`
  display: flex;
  gap: 5px;
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

const SignUpDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 300px;
  height: 42px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin-bottom: 0.25rem;
  background: white;
  color: ${colorSet.base};

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
    margin-bottom: 2px;
  }

  span {
    color: #ff8352;
  }
`;

export const ErrMsg = styled.div`
  margin-top: 3px;
  font-size: 13px;
  &.err {
    color: #ff8352;
  }
  &.ok {
    color: #72b0eb;
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

const PickerWrapper = styled.div`
  position: fixed;
  margin-top: 65px;
  margin-left: 340px;
  z-index: 1;
`;
