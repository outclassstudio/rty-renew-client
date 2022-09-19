import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { deleteStoreItems } from "../redux/reducers/getItemReducer";
import { logoutChange } from "../redux/reducers/loginReducer";
import { colorSet } from "../style/global";

interface Props {
  handleActiveDropdown: () => void;
}

export default function Dropdown({ handleActiveDropdown }: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //로그아웃 요청
  const handleLogout = (): void => {
    dispatch(logoutChange());
    dispatch(deleteStoreItems());
    navigate("/");
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    localStorage.removeItem("id");
  };

  return (
    <MainDiv>
      <Menu className="user">{localStorage.getItem("id")}님</Menu>
      <Menu onClick={() => navigate("/")}>내 공간</Menu>
      <Menu onClick={() => navigate("/send")}>선물 보내기</Menu>
      <Menu onClick={() => navigate("/giftlist")}>보낸 선물함</Menu>
      <Menu onClick={() => navigate("/shop")}>상점</Menu>
      <Menu onClick={() => navigate("/find")}>친구 찾기</Menu>
      <Menu onClick={() => navigate("/userinfo")}>나의 정보</Menu>
      <Menu className="logout" onClick={handleLogout}>
        로그아웃
      </Menu>
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
  background: ${colorSet.base};
  position: fixed;
  top: 55px;
  right: 10px;
  padding: 10px 22px 10px 22px;
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

  &.logout {
    border-top: 1px solid #ffffff96;
    padding-top: 10px;
    margin-top: 5px;
  }
`;
