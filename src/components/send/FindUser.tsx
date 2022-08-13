import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { findUser } from "../../apis/userApi";
import { checkBlank } from "../../hooks/validation";
import { colorSet } from "../../style/global";
import UserlistDropdown from "./UserlistDropdown";

export default function FindUser() {
  const [findUserId, setFindUserId] = useState<string>("");
  const [userList, setUserList] = useState<Users.otherUserDTO[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);

  //사람찾기 실행
  const handleFindUser = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    //*아이디값이 truthy하고 공백이 아닌 경우
    if (findUserId && !findUserId.match(checkBlank)) {
      findUser(findUserId).then((res) => {
        if (res.data.ok) {
          if (res.data.userInfo) {
            setUserList(res.data.userInfo);
            setActiveDropdown(true);
          }
        } else {
          //?DB상에 검색되는 아이디/닉네임이 없는 경우
          Swal.fire({
            title: "찾으시는 아이디/닉네임이 없어요",
            icon: "warning",
            confirmButtonText: "닫기",
          });
        }
      });
    } else {
      Swal.fire({
        title: "아이디나 닉네임을 입력해주세요",
        icon: "warning",
        confirmButtonText: "닫기",
      });
    }
  };

  //드롭다운 닫는 함수
  const closeDropdown = (): void => {
    setActiveDropdown(false);
  };

  //인풋박스 입력값 상태로 업데이트
  const handleUserIdInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFindUserId(e.target.value);
  };

  //esc로 드롭다운 닫기
  const handleCancelFind = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      closeDropdown();
    }
  };

  return (
    <MainContainer>
      <div>보낼사람찾기</div>
      <SearchBarWrapper onSubmit={handleFindUser}>
        <button>
          <img src="https://i.imgur.com/vX7F9l4.png" alt="" />
        </button>
        <input
          onKeyDown={handleCancelFind}
          onChange={handleUserIdInput}
          type="text"
          placeholder="아이디 또는 닉네임을 입력해주세요"
        />
        {activeDropdown ? (
          <UserlistDropdown
            userList={userList}
            closeDropdown={closeDropdown}
            findUserId={findUserId}
          />
        ) : (
          ""
        )}
      </SearchBarWrapper>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  padding: 20px 30px 30px 30px;
  gap: 10px;
  background: ${colorSet.base};
  border-radius: 10px;
  color: white;
  box-shadow: rgba(50, 50, 93, 0.527) 0px 0px 15px 0px;
`;

const SearchBarWrapper = styled.form`
  display: flex;
  gap: 10px;

  button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
  }

  img {
    width: 30px;
  }

  input {
    height: 45px;
    width: 360px;
    padding-left: 10px;
  }
`;
