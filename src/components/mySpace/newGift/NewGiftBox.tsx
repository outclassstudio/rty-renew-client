import styled from "styled-components";
import { useSelector } from "react-redux";
import NewGiftItem from "./NewGiftItem";
import { useState } from "react";
import { colorSet, fadeSlide } from "../../../style/global";

export function NewGiftBox() {
  const newGiftList = useSelector((state: any) => state.spaceReducer.newGift);

  const isOpenGiftBox = useSelector(
    (state: any) => state.spaceReducer.isOpenGiftBox
  );

  return (
    <MainContainer>
      {isOpenGiftBox && newGiftList.length !== 0 && (
        <NewGiftContainer>
          <GiftBoxTitle>🎀 나의 선물 리스트</GiftBoxTitle>
          <ItemContainer>
            {newGiftList &&
              newGiftList.map((item: any, idx: number) => {
                return <NewGiftItem {...item} key={idx} />;
              })}
          </ItemContainer>
        </NewGiftContainer>
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: fixed;
  margin-left: 1250px;
  margin-bottom: 83px;
`;

const NewGiftContainer = styled.div`
  width: 170px;
  height: 547px;
  background-color: ${colorSet.purple};
  overflow: auto;
  border-radius: 10px;
  scrollbar-width: none;
  padding: 10px 20px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 15px 0px;
  animation: ${fadeSlide} 0.3s ease-out;
  user-select: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  height: 90%;
  overflow: auto;

  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const GiftBoxTitle = styled.div`
  display: flex;
  justify-content: center;
  font-family: "Hanna", sans-serif;
  color: #ffffff;
  font-size: 17px;
  margin-bottom: 7px;
`;
