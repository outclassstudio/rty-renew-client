import { useState } from "react";
import { useNavigate } from "react-router";
import styled, { keyframes } from "styled-components";
import { colorSet } from "../style/global";
import Dropdown from "./Dropdown";

interface Props {
  title?: string;
}

export default function Header({ title }: Props) {
  const navigate = useNavigate();
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const [activeClass, setActiveClass] = useState<boolean>(false);

  //서치바 on/off
  const handleActiveSearch = (): void => {
    if (activeSearch) {
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
        <SearchBar
          className={activeClass ? (activeSearch ? "slideIn" : "slideOut") : ""}
        >
          <img
            src="https://i.imgur.com/vX7F9l4.png"
            onClick={handleActiveSearch}
            alt=""
          />
          <SearchBarWrapper className={activeSearch ? "slideIn" : "invisible"}>
            <input type="text" placeholder="친구를 찾아봐요" />
            <div onClick={handleActiveSearch}>X</div>
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

  div {
    display: flex;
    align-items: center;
    opacity: 0.3;
  }

  div:hover {
    opacity: 1;
  }

  input {
    padding-left: 7px;
  }

  input::placeholder {
    font-size: 11px;
  }
`;
