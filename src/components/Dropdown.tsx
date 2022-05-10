import { useNavigate } from "react-router";
import styled from "styled-components";
import { logoutUser } from "../apis/userApi";
import { baseColor } from "../style/global";

export default function Dropdown({ handleActiveDropdown }: any) {
  const navigate = useNavigate();

  //로그아웃 요청
  const handleLogout = (): void => {
    logoutUser();
  };

  return (
    <MainDiv>
      <Menu onClick={() => navigate("/userinfo")}>나의정보</Menu>
      <Menu onClick={() => navigate("/")}>내공간</Menu>
      <Menu onClick={() => navigate("/send")}>선물보내기</Menu>
      <Menu onClick={handleLogout}>로그아웃</Menu>
      <DropdonwBg onClick={handleActiveDropdown} />
    </MainDiv>
  );
}

const DropdonwBg = styled.div`
  position: fixed;
  left: 0;
  top: 50;
  width: 100vw;
  height: calc(100vh - 50px);
  opacity: 0;
`;

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: ${baseColor};
  position: fixed;
  top: 55px;
  right: 10px;
  padding: 10px 15px 10px 15px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 10px 4px;
`;

const Menu = styled.div`
  display: flex;
  justify-content: center;
  color: white;
  cursor: pointer;
  z-index: 1;
`;
