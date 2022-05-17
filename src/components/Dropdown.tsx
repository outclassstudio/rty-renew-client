import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { deleteStoreItems } from "../redux/reducers/getItemReducer";
import { logoutChange } from "../redux/reducers/loginReducer";
import { baseColor } from "../style/global";

export default function Dropdown({ handleActiveDropdown }: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //로그아웃 요청
  const handleLogout = (): void => {
    dispatch(logoutChange());
    dispatch(deleteStoreItems());
    navigate("/");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
    // window.location.replace("/");
  };

  return (
    <MainDiv>
      <Menu className="user">{window.localStorage.getItem("id")}님</Menu>
      <Menu onClick={() => navigate("/")}>내공간</Menu>
      <Menu onClick={() => navigate("/send")}>선물보내기</Menu>
      <Menu onClick={() => navigate("/giftlist")}>선물리스트</Menu>
      <Menu onClick={() => navigate("/shop")}>상점</Menu>
      <Menu onClick={() => navigate("/userinfo")}>나의정보</Menu>
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
  gap: 5px;
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
  font-size: 14px;

  &.user {
    cursor: default;
    border-bottom: 1px solid #ffffff96;
    padding-bottom: 10px;
    margin-bottom: 5px;
  }
`;
