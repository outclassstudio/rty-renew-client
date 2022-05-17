import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { deleteUser, getUserInfo, patchUserInfo } from "../apis/userApi";
import { logoutChange } from "../redux/reducers/loginReducer";
import { baseColor, fadeAction } from "../style/global";
import Layout from "./Layout";
import { NormalBtn } from "../style/btnStyle.style";
import { deleteStoreItems } from "../redux/reducers/getItemReducer";
import Swal from "sweetalert2";

export default function Userinfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //수정모드 on/off상태
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string | undefined>("");

  //유저정보 저장
  const [userInfo, setUserInfo] = useState<any>({
    id: "",
    nickname: "",
    point: 0,
    birth: "",
  });

  //유저정보 불러오기
  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo({
        id: res.data.id,
        nickname: res.data.nickname,
        point: res.data.point,
        birth: res.data.birth,
      });
      setNewNickname(res.data.nickname);
    });
  }, []);

  //로그아웃 요청
  const handleLogout = (): void => {
    dispatch(logoutChange());
    dispatch(deleteStoreItems());
    navigate("/");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
  };

  //유저정보 수정모드 on/off
  const handleUserinfoEdit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setNewNickname(userInfo.nickname);
    setEditMode((prev) => !prev);
  };

  //닉네임변경
  const handleChangeNickname = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewNickname(e.target.value);
  };

  //닉네임 변경 요청
  const handleEditedInfoSend = (
    e: React.MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();

    let data = {
      id: userInfo.id,
      point: userInfo.point,
      birth: userInfo.birth,
      nickname: newNickname,
    };

    if (userInfo.nickname === newNickname) {
      Swal.fire({
        title: "닉네임이 바뀌지 않았네요",
        icon: "warning",
        confirmButtonText: "닫기",
      });
    } else {
      patchUserInfo(data).then(() => {
        Swal.fire({
          title: "수정완료",
          icon: "success",
          confirmButtonText: "닫기",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.replace("/userinfo");
          }
        });
      });
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
        deleteUser().then(() => {
          handleLogout();
        });
      }
    });
  };

  return (
    <Layout title={"나의 정보"}>
      <MainContainer>
        <Logo
          src="https://i.imgur.com/JKy28zb.png"
          title="logo_sample(png).png"
          onClick={() => navigate("/")}
        />
        <UserInfoWrapper>
          <SubWrapper>
            <UserinfoItems>
              <UserinfoText>아이디</UserinfoText>
              <UserinfoBox className={editMode ? "edit" : ""}>
                {userInfo.id}
              </UserinfoBox>
            </UserinfoItems>
            <UserinfoItems>
              <UserinfoText>닉네임</UserinfoText>
              {editMode ? (
                <UserinfoInput
                  value={newNickname}
                  type="text"
                  onChange={(e) => handleChangeNickname(e)}
                />
              ) : (
                <UserinfoBox>{userInfo.nickname}</UserinfoBox>
              )}
            </UserinfoItems>
            <UserinfoItems>
              <UserinfoText>생년월일</UserinfoText>
              <UserinfoBox className={editMode ? "edit" : ""}>
                {userInfo.birth}
              </UserinfoBox>
            </UserinfoItems>
            <UserinfoItems>
              <UserinfoText>나의포인트</UserinfoText>
              <UserinfoBox className={editMode ? "edit" : ""}>
                {userInfo.point}
              </UserinfoBox>
            </UserinfoItems>
          </SubWrapper>

          {editMode ? (
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
              className="a"
              width={"315px"}
              height={"45px"}
              onClick={(e) => handleUserinfoEdit(e)}
            >
              정보수정
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
  animation: 0.7s ease-in-out ${fadeAction};
  /* animation-iteration-count: 1; */
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
  gap: 5px;
  margin-bottom: 20px;
`;

const SubWrapper = styled.div`
  padding: 20px 30px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #4c3e9f;
  margin-bottom: 10px;
  box-shadow: rgba(50, 50, 93, 0.4) 0px 0px 15px 0px;
`;

export const UserinfoItems = styled.div`
  margin: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
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
  color: ${baseColor};

  &.sub {
    width: 191px;
    margin-right: 8px;
    margin-bottom: 0px;
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
  color: ${baseColor};
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
  gap: 5px;
`;
