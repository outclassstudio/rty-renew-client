import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { getUserInfo, logoutUser } from "../apis/userApi";
import { baseColor, fadeAction } from "../style/global";
import Layout from "./Layout";

export default function Userinfo() {
  const navigate = useNavigate();

  //유저정보 저장
  const [userInfo, setUserInfo] = useState<Users.myinfoDTO>({
    id: "",
    nickname: "",
    point: 0,
    birth: "",
  });

  //유저정보 불러오기
  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res.data);
    });
  }, []);

  //로그아웃 요청
  const handleLogout = (): void => {
    logoutUser();
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
              <UserinfoBox>{userInfo.id}</UserinfoBox>
            </UserinfoItems>
            <UserinfoItems>
              <UserinfoText>닉네임</UserinfoText>
              <UserinfoBox>{userInfo.nickname}</UserinfoBox>
            </UserinfoItems>
            <UserinfoItems>
              <UserinfoText>생년월일</UserinfoText>
              <UserinfoBox>{userInfo.birth}</UserinfoBox>
            </UserinfoItems>
            <UserinfoItems>
              <UserinfoText>나의포인트</UserinfoText>
              <UserinfoBox>{userInfo.point}</UserinfoBox>
            </UserinfoItems>
          </SubWrapper>
          <Btn className="a" onClick={handleLogout}>
            로그아웃
          </Btn>
          <Btn className="b">계정삭제</Btn>
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
`;

const SubWrapper = styled.div`
  padding: 20px 30px 20px 30px;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #4c3e9f;
  margin-bottom: 10px;
`;

export const UserinfoItems = styled.div`
  margin: 0.8rem 0.8rem 0.8rem 0.8rem;
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
  box-shadow: 0.05rem 0.05rem 0.05rem #6969692d;
  margin-bottom: 0.25rem;
  background: white;
  color: ${baseColor};

  &.sub {
    width: 191px;
    margin-right: 8px;
    margin-bottom: 0px;
  }
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

export const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 45px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

  &.a {
    background: linear-gradient(90deg, #ffca60 0%, #fb834c 58.85%);
  }

  &.b {
    background: linear-gradient(to right, #ec047a 30%, #b22490 100%);
  }

  :active {
    box-shadow: inset 1px 1px 2px 2px rgba(0, 0, 0, 0.3);
  }
`;
