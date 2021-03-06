import styled from "styled-components";
import { useSelector } from "react-redux";
import NewGiftItem from "./NewGiftItem";
import { useEffect, useState } from "react";
import { colorSet, fadeSlide } from "../../../style/global";

export function NewGiftBox(props: any) {
  const [newList, setNewList] = useState<any>();
  const [storageList, setStorageList] = useState<any>();

  const storageGiftLists = useSelector(
    (state: any) => state.spaceReducer.storageGiftList
  );

  const newGiftLists = useSelector(
    (state: any) => state.spaceReducer.newGiftList
  );

  const isOpenGiftBox = useSelector(
    (state: any) => state.spaceReducer.isOpenGiftBox
  );
  const clickGiftBox = useSelector(
    (state: any) => state.spaceReducer.clickGiftBox
  );

  useEffect(() => {
    if (storageGiftLists && newGiftLists) {
      setStorageList(storageGiftLists);
      setNewList(newGiftLists);
    }
  }, [newGiftLists, storageGiftLists]);

  //newGift icon click modal msg new Gift, data newList
  //storage icon click modal msg storage Gift, data storageList
  return (
    <MainContainer>
      {isOpenGiftBox ? (
        <>
          {clickGiftBox === "new" && newList.length !== 0 ? (
            <>
              <NewGiftContainer>
                <GiftBoxTitle>🎀New Gift!</GiftBoxTitle>
                <ItemContainer>
                  {newList &&
                    newList.map((item: any, idx: number) => {
                      return <NewGiftItem {...item} key={idx.toString()} />;
                    })}
                </ItemContainer>
              </NewGiftContainer>
            </>
          ) : null}
          {storageGiftLists &&
          storageList &&
          clickGiftBox === "storage" &&
          storageList.length !== 0 ? (
            <>
              <NewGiftContainer>
                <GiftBoxTitle>🎁Storage Gift!</GiftBoxTitle>
                <ItemContainer>
                  {storageList &&
                    storageList.map((item: any, idx: number) => {
                      return <NewGiftItem {...item} key={idx.toString()} />;
                    })}
                </ItemContainer>
              </NewGiftContainer>
            </>
          ) : null}
        </>
      ) : null}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  position: fixed;
  margin-left: 1530px;
`;

export const NewGiftContainer = styled.div`
  margin: 50px 10px 0;
  width: 170px;
  height: 700px;
  background-color: ${colorSet.purple};
  overflow: auto;
  border-radius: 10px;

  scrollbar-width: none;
  padding: 10px 20px;
  animation: ${fadeSlide} 0.3s ease-out;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 15px 0px;

  user-select: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ItemContainer = styled.div`
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

export const GiftBoxTitle = styled.div`
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 5px;
`;
