import styled from "styled-components";
import { useSelector } from "react-redux";
import NewGiftItem from "./NewGiftItem";
import { useEffect, useState } from "react";
import { colorSet, fadeSlide } from "../../../style/global";

export function NewGiftBox(props: any) {
  const [newList, setNewList] = useState<any>();
  const [storageList, setStorageList] = useState<any>();
  const userGiftList = useSelector((state: any) => state.spaceReducer.myGift);

  const isOpenGiftBox = useSelector(
    (state: any) => state.spaceReducer.isOpenGiftBox
  );
  const clickGiftBox = useSelector(
    (state: any) => state.spaceReducer.clickGiftBox
  );

  useEffect(() => {
    if (userGiftList) {
      const newGiftLists = userGiftList.filter(
        (item: any) => item.status === "new"
      );
      setNewList(newGiftLists);
    }
  }, [userGiftList]);

  return (
    <MainContainer>
      {isOpenGiftBox ? (
        <>
          {clickGiftBox === "new" && newList.length !== 0 ? (
            <NewGiftContainer>
              <GiftBoxTitle>🎀New Gift!</GiftBoxTitle>
              <ItemContainer>
                {newList &&
                  newList.map((item: any, idx: number) => {
                    return <NewGiftItem {...item} key={idx} />;
                  })}
              </ItemContainer>
            </NewGiftContainer>
          ) : null}
          {storageList &&
          clickGiftBox === "storage" &&
          storageList.length !== 0 ? (
            <NewGiftContainer>
              <GiftBoxTitle>🎁Storage Gift!</GiftBoxTitle>
              <ItemContainer>
                {storageList &&
                  storageList.map((item: any, idx: number) => {
                    return <NewGiftItem {...item} key={idx.toString()} />;
                  })}
              </ItemContainer>
            </NewGiftContainer>
          ) : null}
        </>
      ) : null}
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
  animation: ${fadeSlide} 0.3s ease-out;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 15px 0px;

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
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 5px;
`;
