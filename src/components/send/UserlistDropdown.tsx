import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setNickname, setTo } from "../../redux/reducers/sendGiftReducer";

export default function UserlistDropdown({ userList, closeDropdown }: any) {
  const dispatch = useDispatch();

  //선택한 아이디로 상태업데이트
  const handleSetToUser = (id: string, nickname: string): void => {
    dispatch(setTo(id));
    dispatch(setNickname(nickname));
    closeDropdown();
  };

  return (
    <>
      <MainWrapper>
        {userList.length !== 0
          ? userList.map((el: any, idx: number) => {
              return (
                <SingleUser
                  key={idx}
                  onClick={() => handleSetToUser(el.id, el.nickname)}
                >
                  <span>{el.nickname}</span>
                  <span>( {el.id} )</span>
                </SingleUser>
              );
            })
          : ""}
      </MainWrapper>
      <DropdonwBg onClick={closeDropdown}></DropdonwBg>
    </>
  );
}

const DropdonwBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
`;

const MainWrapper = styled.div`
  position: fixed;
  /* left: 225px; */
  /* top: 230px; */
  margin-top: 57px;
  margin-left: 55px;
  display: flex;
  flex-direction: column;
  background: white;
  color: black;
  width: 360px;
  box-shadow: rgba(50, 50, 93, 0.527) 0px 0px 15px 0px;
  z-index: 1;
`;

const SingleUser = styled.div`
  display: flex;
  gap: 5px;
  font-size: 13px;
  padding: 10px;
  cursor: pointer;
  z-index: 1;

  span:nth-child(1) {
    font-weight: bold;
  }

  span:nth-child(2) {
    font-size: 12px;
    color: #393939;
  }

  :hover {
    background: #72b0eb;
  }
`;
