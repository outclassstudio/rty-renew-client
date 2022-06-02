import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import { findUser } from "../apis/userApi";
import { checkBlank } from "../hooks/validation";
import { NormalBtn } from "../style/btnStyle.style";
import { colorSet, fadeAction } from "../style/global";
import Dropdown from "./Dropdown";
import HeaderUserlist from "./HeaderUserlist";

interface Props {
  title?: string;
}

export default function Header({ title }: Props) {
  const navigate = useNavigate();

  //서치바 활성화 부분
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const [activeClass, setActiveClass] = useState<boolean>(false);

  //사람검색 부분
  const [findUserId, setFindUserId] = useState<string>("");
  const [userList, setUserList] = useState<Users.otherUserDTO[]>([]);
  const [activeFindDropdown, setActiveFindDropdown] = useState<boolean>(false);

  //서치바 on/off
  const handleActiveSearch = (): void => {
    if (activeSearch) {
      setFindUserId("");
      setActiveSearch(false);
    } else {
      setActiveClass(true);
      setActiveSearch(true);
    }
  };

  //dropdonw on/off
  const handleActiveDropdown = (): void => {
    setActiveDropdown((prev) => !prev);
  };

  const closeDropDown = (): void => {
    if (activeDropdown) {
      setActiveDropdown(false);
    }
  };

  //사람찾기 실행
  const handleFindUser = (e: any): void => {
    e.preventDefault();

    //*아이디값이 truthy하고 공백이 아닌 경우
    if (findUserId && !findUserId.match(checkBlank)) {
      findUser(findUserId).then((res) => {
        if (res.data.length !== 0) {
          setUserList(res.data);
          setActiveFindDropdown(true);
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

  const findToEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleFindUser(e);
    } else if (e.key === "Escape") {
      closeListDropdown();
    }
  };

  //드롭다운 닫는 함수
  const closeListDropdown = (): void => {
    setActiveFindDropdown(false);
  };

  //인풋박스 입력값 상태로 업데이트
  const handleUserIdInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFindUserId(e.target.value);
  };

  return (
    <HeaderDiv onClick={closeDropDown}>
      <HeaderLeft>
        <img
          src="https://i.imgur.com/TfwRuKo.png"
          onClick={() => navigate("/")}
          alt=""
        />
      </HeaderLeft>
      <HeaderCenter>{title}</HeaderCenter>
      <HeaderRight>
        {activeSearch ? (
          ""
        ) : (
          <SubText
            className={activeClass ? (activeSearch ? "" : "fadeOut") : ""}
          >
            다른 사람 공간 빠르게 찾기 ▶
          </SubText>
        )}
        <SearchBar
          className={activeClass ? (activeSearch ? "slideIn" : "slideOut") : ""}
        >
          <img
            src="https://i.imgur.com/vX7F9l4.png"
            onClick={handleActiveSearch}
            alt=""
          />
          <SearchBarWrapper className={activeSearch ? "slideIn" : "invisible"}>
            <input
              type="text"
              placeholder="친구를 찾아봐요"
              onChange={(e) => handleUserIdInput(e)}
              onKeyDown={(e) => findToEnter(e)}
              value={findUserId}
            />
            <NormalBtn
              className="b"
              width={"50px"}
              height={"30px"}
              onClick={handleFindUser}
            >
              찾기
            </NormalBtn>
            <CloseText onClick={handleActiveSearch}>X</CloseText>
            {activeFindDropdown ? (
              <HeaderUserlist
                userList={userList}
                closeDropdown={closeListDropdown}
                findUserId={findUserId}
              />
            ) : (
              ""
            )}
          </SearchBarWrapper>
        </SearchBar>
        <img
          src="https://i.imgur.com/avLXvDj.png"
          onClick={handleActiveDropdown}
          alt=""
        />
      </HeaderRight>
      {activeDropdown ? (
        <Dropdown handleActiveDropdown={handleActiveDropdown} />
      ) : (
        ""
      )}
    </HeaderDiv>
  );
}

const slideInFade = keyframes`
  0% {
    transform : translateX(5px);
    opacity: 0;
  }

  100% {
    transform : translateX(0px);
    opacity: 1;
  }
`;

const slideIn = keyframes`
  0% {
    transform : translateX(80%);
  }

  100% {
    transform : translateX(0%);
  }
`;

const slideOut = keyframes`
  0% {
    transform : translateX(-80%);
  }

  100% {
    transform : translateX(0%);
  }
`;

const HeaderDiv = styled.header`
  height: 50px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: ${colorSet.base};
  box-shadow: none;
  user-select: none;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  width: 185px;
  padding-left: 15px;

  img {
    width: 32px;
    cursor: pointer;
  }
`;

const HeaderCenter = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Hanna", sans-serif;
  font-size: 17px;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  width: 185px;
  padding-right: 15px;
  gap: 5px;

  img {
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
`;

const SubText = styled.div`
  position: fixed;
  right: 88px;
  font-size: 12px;
  color: #ffffffc5;
  margin-bottom: 2px;

  &.fadeOut {
    animation: ${fadeAction} 0.2s linear;
  }
`;

const SearchBar = styled.div`
  width: 160px;
  display: flex;
  justify-content: right;
  align-items: center;
  gap: 5px;

  &.slideIn {
    animation: 0.2s ease-out ${slideIn};
  }

  &.slideOut {
    animation: 0.2s ease-out ${slideOut};
  }

  img {
    margin-top: 2px;
    width: 28px;
    height: 28px;
  }

  input {
    width: 110px;
    height: 28px;
    border-radius: 5px;
    border: none;
    opacity: 0.7;
  }
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 5px;
  cursor: pointer;
  margin-right: 5px;

  &.slideIn {
    animation: 0.2s ease-out ${slideInFade};
  }

  &.invisible {
    display: none;
  }

  input {
    padding-left: 7px;
  }

  input::placeholder {
    font-size: 11px;
  }
`;

const CloseText = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.3;

  :hover {
    opacity: 1;
  }
`;
