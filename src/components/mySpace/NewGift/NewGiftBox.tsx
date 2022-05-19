import styled from "styled-components";
import { useSelector } from "react-redux";
import NewGiftItem from "./NewGiftItem";
import { useEffect, useState } from "react";
import StorageItem from "../Storage/StorageItem";
import { getGift } from "../../../apis/giftApi";
import { colorSet, fadeSlide } from "../../../style/global";

export const NewGiftContainer = styled.div`
  margin: 50px 10px 0;
  width: 170px;
  height: 700px;
  background-color: ${colorSet.purple};
  border-radius: 10px;
  overflow: auto;
  scrollbar-width: none;
  padding: 10px 20px;
  animation: ${fadeSlide} 0.3s ease-out;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 15px 0px;

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
  height: 650px;
`;

export const GiftBoxTitle = styled.div`
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 5px;
`;

export function NewGiftBox(props: any) {
  const newGiftList = props.newGiftList;
  const storageGiftList = props.storageGiftList;

  const [newList, setNewList] = useState(newGiftList);
  const [storageList, setStorageList] = useState<any>([]);
  // const newGiftLists = useSelector((state: any) => state.spaceReducer.myGift);

  const isOpenGiftBox = useSelector(
    (state: any) => state.spaceReducer.isOpenGiftBox
  );
  const clickGiftBox = useSelector(
    (state: any) => state.spaceReducer.clickGiftBox
  );

  useEffect(() => {
    setNewList(newGiftList);
    setStorageList(storageGiftList);
  }, [newGiftList, storageGiftList]);

  console.log("newGiftBox", isOpenGiftBox, clickGiftBox, storageList);

  //newGift icon click modal msg new Gift, data newList
  //storage icon click modal msg storage Gift, data storageList
  return (
    <MainContainer>
      {isOpenGiftBox ? (
        <>
          {clickGiftBox === "new" && newGiftList.length !== 0 ? (
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
          {clickGiftBox === "storage" && storageGiftList.length !== 0 ? (
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
