import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { getUserInfo } from "../apis/userApi";
import { logoutChange } from "../redux/reducers/loginReducer";
import { baseColor, fadeAction } from "../style/global";
import Layout from "./Layout";
import { NormalBtn } from "../style/btnStyle.style";

export default function Userinfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    });
  }, []);

  //로그아웃 요청
  const handleLogout = (): void => {
    // logoutUser().then(() => {

    // });
    dispatch(logoutChange());
    navigate("/");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
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
          <NormalBtn
            className="a"
            width={"315px"}
            height={"45px"}
            onClick={handleLogout}
          >
            로그아웃
          </NormalBtn>
          <NormalBtn className="b" width={"315px"} height={"45px"}>
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
