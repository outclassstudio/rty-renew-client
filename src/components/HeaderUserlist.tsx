import { useNavigate } from "react-router";
import styled from "styled-components";
import Swal from "sweetalert2";
import { colorSet } from "../style/global";

export default function HeaderUserlist({ userList, closeDropdown }: any) {
  const navigate = useNavigate();

  //선택한 아이디로 상태업데이트
  const handleVisitOthers = (id: string, nickname: string): void => {
    if (id === window.localStorage.getItem("id")) {
      Swal.fire({
        title: "자신의 페이지는 방문할 수 없어요",
        icon: "warning",
        confirmButtonText: "닫기",
      });
    } else {
      closeDropdown();
      navigate(`/visit/${id}`);
    }
  };

  return (
    <>
      <MainWrapper>
        {userList.length !== 0
          ? userList.map((el: any, idx: number) => {
              return (
                <SingleUser
                  key={idx}
                  onClick={() => handleVisitOthers(el.id, el.nickname)}
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
  z-index: 1;
`;

const MainWrapper = styled.div`
  position: fixed;
  top: 45px;
  display: flex;
  flex-direction: column;
  background: white;
  color: black;
  width: 175px;
  box-shadow: rgba(50, 50, 93, 0.527) 0px 0px 15px 0px;
  z-index: 2;
  opacity: 1;
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
    background: ${colorSet.skyBlue};
  }
`;
