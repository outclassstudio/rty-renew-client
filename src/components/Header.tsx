import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { baseColor } from "../style/global";
import Dropdown from "./Dropdown";

interface Props {
  title?: string;
}

export default function Header({ title }: Props) {
  const navigate = useNavigate();
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);

  //서치바 on/off
  const handleActiveSearch = (): void => {
    if (activeSearch) {
      setActiveSearch(false);
    } else {
      setActiveSearch(true);
    }
  };

  //dropdonw on/off
  const handleActiveDropdown = (): void => {
    if (activeDropdown) {
      setActiveDropdown(false);
    } else {
      setActiveDropdown(true);
    }
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
        <SearchBar>
          <img
            src="https://i.imgur.com/vX7F9l4.png"
            onClick={handleActiveSearch}
            alt=""
          />
          {activeSearch ? <input type="text" /> : ""}
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

const HeaderDiv = styled.header`
  height: 50px;
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  background-color: ${baseColor};
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
