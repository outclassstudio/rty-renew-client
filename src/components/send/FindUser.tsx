import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { findUser } from "../../apis/userApi";
import { baseColor } from "../../style/global";
import UserlistDropdown from "./UserlistDropdown";

export default function FindUser() {
  const [findUserId, setFindUserId] = useState<string>("");
  const [userList, setUserList] = useState<any[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);

  //공백체크 정규표현식
  const pattern = /\s/g;

  //사람찾기 실행
  const handleFindUser = (e: React.SyntheticEvent): void => {
    e.preventDefault();

    //*아이디값이 truthy하고 공백이 아닌 경우
    if (findUserId && !findUserId.match(pattern)) {
      findUser(findUserId).then((res) => {
        if (res.data.length !== 0) {
          setUserList(res.data);
          setActiveDropdown(true);
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
    // console.log(e.target.value);
    setFindUserId(e.target.value);
  };

  return (
    <MainContainer>
      <div>보낼사람찾기</div>
      <SearchBarWrapper onSubmit={handleFindUser}>
        <button>
          <img src="https://i.imgur.com/vX7F9l4.png" alt="" />
        </button>
        <input
          onChange={handleUserIdInput}
          type="text"
          placeholder="아이디 또는 닉네임을 입력해주세요"
        />
        {activeDropdown ? (
          <UserlistDropdown userList={userList} closeDropdown={closeDropdown} />
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
  background: ${baseColor};
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
