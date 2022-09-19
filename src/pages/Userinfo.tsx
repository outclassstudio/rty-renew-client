import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import {
  changePassword,
  checkPassowrd,
  deleteAccount,
  getMyInfo,
  patchUserInfo,
} from "../apis/userApi";
import { logoutChange } from "../redux/reducers/loginReducer";
import { colorSet, DropdonwBg, fadeAction, fadeSlide } from "../style/global";
import Layout from "./Layout";
import { NormalBtn } from "../style/btnStyle.style";
import { deleteStoreItems } from "../redux/reducers/getItemReducer";
import Swal from "sweetalert2";
import MyPicker from "../components/MyPicker";
import { nickNameCheck, strongPassword } from "../hooks/validation";
import { ErrMsg } from "./Signup";
import Loading from "../components/Loading";
import useDate from "../hooks/useDate";
import { LOCALSTORAGE_ID, LOCALSTORAGE_TOKEN } from "../constants";

interface PwInfo {
  current: string;
  password: string;
  passwordCheck: string;
}

interface Errors {
  emptyBoxCheck: boolean;
  pwCheck: boolean;
}

export default function Userinfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const now = useDate();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  //수정모드 on/off상태
  const [editMode, setEditMode] = useState<boolean>(false);
  const [pwChangeMode, setPwChangeMode] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string | undefined>("");
  const [newBirth, setNewBirth] = useState<string | undefined>("");

  //데이트피커 on/off상태
  const [activePicker, setActivePicker] = useState(false);

  //유저정보 저장
  const [userInfo, setUserInfo] = useState<any>({});

  //비밀번호 변경 정보
  const [changePwdInfo, setChangePwdInfo] = useState<PwInfo>({
    current: "",
    password: "",
    passwordCheck: "",
  });

  //비밀번호 확인 여부
  const [checkPw, setCheckPw] = useState<boolean>(false);

  //에러상태묶음
  const [errors, setErrors] = useState<Errors>({
    emptyBoxCheck: false,
    pwCheck: false,
  });

  //유저정보 불러오기
  useEffect(() => {
    getMyInfo().then((res) => {
      setIsLoading(false);
      if (res.data.userInfo) {
        setUserInfo(res.data.userInfo);
        setNewNickname(res.data.userInfo.nickname);
      }
    });
  }, []);

  //로그아웃 요청
  const handleLogout = (): void => {
    dispatch(logoutChange());
    dispatch(deleteStoreItems());
    navigate("/");
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    localStorage.removeItem(LOCALSTORAGE_ID);
  };

  //유저정보 수정모드 on/off
  const handleUserinfoEdit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setNewBirth(userInfo.birth);
    setNewNickname(userInfo.nickname);
    setEditMode((prev) => !prev);
  };

  //비번변경모드 on/off
  const handlePwChange = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setPwChangeMode((prev) => !prev);
    setChangePwdInfo({
      current: "",
      password: "",
      passwordCheck: "",
    });
    setCheckPw(false);
  };

  //닉네임변경
  const handleChangeNickname = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewNickname(e.target.value);
  };

  //닉네임 및 생일 변경 요청
  const handleEditedInfoSend = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();

    let data = {
      userId: userInfo.userId,
      point: userInfo.point,
      birth: newBirth,
      nickname: newNickname,
    };

    if (userInfo.nickname === newNickname && userInfo.birth === newBirth) {
      Swal.fire({
        title: "변경된 정보가 없어요",
        icon: "warning",
        confirmButtonText: "닫기",
      });
    } else {
      if (newNickname !== "" && !nickNameCheck(String(newNickname))) {
        patchUserInfo(data)
          .then((res) => {
            if (res.data.ok) {
              Swal.fire({
                title: "수정완료",
                icon: "success",
                confirmButtonText: "닫기",
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.replace("/userinfo");
                }
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "에러가 있어요",
              text: `${err}`,
              icon: "error",
              confirmButtonText: "닫기",
            });
          });
      } else {
        Swal.fire({
          title: "입력을 확인해주세요",
          icon: "warning",
          confirmButtonText: "닫기",
        });
      }
    }
  };

  //닉네임유효성 검사 결과 렌더링하는 함수
  const renderNicknameValidCheckMessage = () => {
    if (
      (newNickname !== "" && nickNameCheck(String(newNickname))) ||
      String(newNickname).length > 10
    ) {
      return <ErrMsg className="err">유효하지 않은 닉네임입니다</ErrMsg>;
    }
  };

  //계정삭제 요청 함수
  const handleDeleteAcount = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    Swal.fire({
      title: "정말 삭제하시겠습니까?",
      text: "저장된 작업이 모두 삭제됩니다",
      icon: "warning",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: "네",
      cancelButtonText: "취소!",
    }).then((result) => {
      if (result.isDenied) {
        deleteAccount().then((res) => {
          if (res.data.ok) {
            handleLogout();
          } else {
            Swal.fire({
              title: "계정을 삭제하지 못했어요",
              text: res.data.error,
              icon: "error",
            });
          }
        });
      }
    });
  };

  //날짜선택 on/off함수
  const handleAcitvePicker = () => {
    setActivePicker((prev) => !prev);
  };

  //날짜변경 상태 업데이트
  const handleDateValue = (date: string) => {
    if (now.now < date) {
      Swal.fire({
        title: "미래 날짜는 입력할 수 없어요",
        icon: "warning",
        confirmButtonText: "닫기",
      });
    } else {
      setNewBirth(date);
    }
  };

  //비밀번호 정보 상태 저장
  const handlePwValue =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setChangePwdInfo({ ...changePwdInfo, [key]: e.target.value });
    };

  //비밀번호 유효성 검사 결과 렌더링하는 함수
  const renderValidationCheckMessage = () => {
    if (
      changePwdInfo.password !== "" &&
      !strongPassword(changePwdInfo.password)
    ) {
      return <ErrMsg className="err">유효하지 않은 비밀번호입니다</ErrMsg>;
    }
  };

  //비밀번호 불일치 오류메세지를 렌더하는 함수
  const renderFeedbackMessage = () => {
    if (changePwdInfo.password !== changePwdInfo.passwordCheck) {
      return <ErrMsg className="err">패스워드가 일치하지 않습니다</ErrMsg>;
    }
  };

  //빈칸있을 경우 메시지 렌더 함수
  const renderEmptyBoxCheck = () => {
    return <ErrMsg className="err">빈칸은 안돼요</ErrMsg>;
  };

  //비밀번호 확인 요청
  const handleCheckPw = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      id: localStorage.getItem(LOCALSTORAGE_ID),
      pwd: changePwdInfo.current,
    };

    try {
      const passwordChecked = await checkPassowrd(data);
      setCheckPw(passwordChecked.data.ok);
      setErrors({ ...errors, pwCheck: false });
    } catch (error) {
      setErrors({ ...errors, pwCheck: true });
    }

    // checkPassowrd(data)
    //   .then((res) => {
    //     //! 응답에 따른 구현 확인
    //     setCheckPw(res.data.ok);
    //     setErrors({ ...errors, pwCheck: false });
    //   })
    //   .catch(() => {
    //     setErrors({ ...errors, pwCheck: true });
    //   });
  };

  //비밀번호 변경 요청
  const handleChangedPwSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = {
      id: localStorage.getItem(LOCALSTORAGE_ID),
      npwd: changePwdInfo.password,
    };

    if (
      strongPassword(changePwdInfo.password) &&
      changePwdInfo.password !== "" &&
      changePwdInfo.passwordCheck !== "" &&
      changePwdInfo.password === changePwdInfo.passwordCheck
    ) {
      changePassword(data)
        .then((res) => {
          if (res.data.ok) {
            Swal.fire({
              title: "비밀번호가 성공적으로 변경되었습니다",
              icon: "success",
              confirmButtonText: "닫기",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.replace("/userinfo");
              }
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            title: "에러가 있어요",
            text: `${err.response.data}`,
            icon: "error",
            confirmButtonText: "닫기",
          });
        });
    } else {
      Swal.fire({
        title: "입력을 다시 확인해주세요",
        icon: "warning",
        confirmButtonText: "닫기",
      });
      setErrors({ ...errors, emptyBoxCheck: true });
    }
  };

  return (
    <Layout title={"나의 정보"}>
      {isLoading ? (
        <Loading />
      ) : (
        <MainContainer>
          <Logo
            src="https://i.imgur.com/JKy28zb.png"
            title="logo_sample(png).png"
            onClick={() => navigate("/")}
          />
          <UserInfoWrapper>
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
            {pwChangeMode ? (
              <SubWrapper className="change-mode">
                <UserinfoItems>
                  <UserinfoText>현재비밀번호</UserinfoText>
                  <UserinfoInput
                    type="password"
                    onChange={handlePwValue("current")}
                  ></UserinfoInput>
                  {errors.emptyBoxCheck
                    ? changePwdInfo.current === ""
                      ? renderEmptyBoxCheck()
                      : ""
                    : ""}
                  {checkPw ? (
                    ""
                  ) : (
                    <BtnWrapper className="row">
                      <NormalBtn
                        className="a"
                        width={"312px"}
                        height={"45px"}
                        onClick={(e) => handleCheckPw(e)}
                      >
                        비밀번호 확인
                      </NormalBtn>
                      {errors.pwCheck ? (
                        <ErrMsg className="err">비밀번호가 잘못됐습니다</ErrMsg>
                      ) : (
                        ""
                      )}
                    </BtnWrapper>
                  )}
                </UserinfoItems>
                {checkPw ? (
                  <>
                    <UserinfoItems className="change-pw">
                      <UserinfoText>변경할 비밀번호</UserinfoText>
                      <UserinfoText className="sub">
                        * 6자 이상, 영어, 숫자를 포함한 비밀번호
                      </UserinfoText>
                      <UserinfoInput
                        type="password"
                        onChange={handlePwValue("password")}
                      ></UserinfoInput>
                      {renderValidationCheckMessage()}
                      {errors.emptyBoxCheck
                        ? changePwdInfo.password === ""
                          ? renderEmptyBoxCheck()
                          : ""
                        : ""}
                    </UserinfoItems>
                    <UserinfoItems>
                      <UserinfoText>변경할 비밀번호 확인</UserinfoText>
                      <UserinfoInput
                        type="password"
                        onChange={handlePwValue("passwordCheck")}
                      ></UserinfoInput>
                      {renderFeedbackMessage()}
                      {errors.emptyBoxCheck
                        ? changePwdInfo.passwordCheck === ""
                          ? renderEmptyBoxCheck()
                          : ""
                        : ""}
                    </UserinfoItems>
                  </>
                ) : (
                  ""
                )}
              </SubWrapper>
            ) : (
              <SubWrapper>
                <UserinfoItems>
                  <UserinfoText>아이디</UserinfoText>
                  <UserinfoBox className={editMode ? "edit" : ""}>
                    {userInfo.userId}
                  </UserinfoBox>
                </UserinfoItems>
                <UserinfoItems>
                  <UserinfoText>닉네임</UserinfoText>
                  {editMode ? (
                    <>
                      <UserinfoInput
                        value={newNickname}
                        type="text"
                        onChange={(e) => handleChangeNickname(e)}
                      />
                      {renderNicknameValidCheckMessage()}
                    </>
                  ) : (
                    <UserinfoBox>{userInfo.nickname}</UserinfoBox>
                  )}
                </UserinfoItems>
                <UserinfoItems>
                  <UserinfoText>생년월일</UserinfoText>
                  {editMode ? (
                    <BtnWrapper>
                      <UserinfoBox className="sub">{newBirth}</UserinfoBox>
                      <BtnDiv
                        height={"42px"}
                        width={"95px"}
                        onClick={handleAcitvePicker}
                        className="a"
                      >
                        날짜선택
                      </BtnDiv>
                    </BtnWrapper>
                  ) : (
                    <UserinfoBox>{userInfo.birth}</UserinfoBox>
                  )}
                </UserinfoItems>
                <UserinfoItems>
                  <UserinfoText>나의포인트</UserinfoText>
                  <UserinfoBox className={editMode ? "edit" : ""}>
                    {userInfo.point}
                  </UserinfoBox>
                </UserinfoItems>
              </SubWrapper>
            )}
            {pwChangeMode ? (
              ""
            ) : editMode ? (
              <BtnWrapper>
                <NormalBtn
                  className="a"
                  width={"155px"}
                  height={"45px"}
                  onClick={(e) => handleUserinfoEdit(e)}
                >
                  변경취소
                </NormalBtn>
                <NormalBtn
                  className="c"
                  width={"155px"}
                  height={"45px"}
                  onClick={(e) => handleEditedInfoSend(e)}
                >
                  수정완료
                </NormalBtn>
              </BtnWrapper>
            ) : (
              <NormalBtn
                className="c"
                width={"315px"}
                height={"45px"}
                onClick={(e) => handleUserinfoEdit(e)}
              >
                정보수정
              </NormalBtn>
            )}

            {editMode ? (
              ""
            ) : pwChangeMode ? (
              <BtnWrapper>
                <NormalBtn
                  className="a"
                  width={"155px"}
                  height={"45px"}
                  onClick={(e) => handlePwChange(e)}
                >
                  변경취소
                </NormalBtn>
                <NormalBtn
                  className="c"
                  width={"155px"}
                  height={"45px"}
                  onClick={(e) => handleChangedPwSend(e)}
                >
                  변경완료
                </NormalBtn>
              </BtnWrapper>
            ) : (
              <NormalBtn
                className="c"
                width={"315px"}
                height={"45px"}
                onClick={(e) => handlePwChange(e)}
              >
                비밀번호변경
              </NormalBtn>
            )}

            <NormalBtn
              className="a"
              width={"315px"}
              height={"45px"}
              onClick={handleLogout}
            >
              로그아웃
            </NormalBtn>
            <NormalBtn
              className="b"
              width={"315px"}
              height={"45px"}
              onClick={(e) => handleDeleteAcount(e)}
            >
              계정삭제
            </NormalBtn>
          </UserInfoWrapper>
        </MainContainer>
      )}
    </Layout>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(100vh - 50px);
  gap: 15px;
  animation: 0.5s ease-in-out ${fadeAction};
`;

const Logo = styled.img`
  width: 320px;
  cursor: pointer;
`;

export const UserInfoWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const SubWrapper = styled.div`
  padding: 20px 30px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${colorSet.purple};
  margin-bottom: 10px;
  box-shadow: rgba(50, 50, 93, 0.4) 0px 0px 15px 0px;
  animation: 0.5s ease-in-out ${fadeAction};

  &.change-mode {
    animation: 0.2s ease-out ${fadeSlide};
  }
`;

export const UserinfoItems = styled.div`
  margin: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;

  &.change-pw {
    border-top: 1px solid #ffffff44;
    padding-top: 10px;
  }
`;

export const UserinfoBox = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  height: 40px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 1px 1px 1px #6969692d;
  margin-bottom: 4px;
  background: white;
  color: ${colorSet.base};

  &.sub {
    width: 191px;
    margin-right: 8px;
  }

  &.edit {
    background: #c2c2c2;
  }
`;

const UserinfoInput = styled.input`
  display: flex;
  align-items: center;
  width: 298px;
  height: 38px;
  padding-left: 10px;
  border: 1px solid #a5a5a5;
  box-shadow: 1px 1px 1px #6969692d;
  margin-bottom: 4px;
  background: white;
  color: ${colorSet.base};
  font-size: 16px;
`;

export const UserinfoText = styled.div`
  font-weight: bold;

  &.sub {
    font-size: 12px;
    font-weight: 340;
  }

  span {
    color: #ff8352;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  &.row {
    flex-direction: column;
    align-items: center;
  }
`;

const PickerWrapper = styled.div`
  position: fixed;
  margin-top: 223px;
  margin-left: 690px;
  z-index: 1;
`;

interface Size {
  width?: string;
  height?: string;
}

const BtnDiv = styled.div<Size>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;

  &.a {
    background: linear-gradient(90deg, #ffca60 0%, #fb834c 58.85%);
  }

  &.b {
    background: linear-gradient(to right, #ec047a 30%, #b22490 100%);
  }

  &.c {
    background: linear-gradient(to right, #45a097 30%, #1b3550 100%);
  }

  :active {
    box-shadow: inset 1px 1px 2px 2px rgba(0, 0, 0, 0.3);
  }
`;
