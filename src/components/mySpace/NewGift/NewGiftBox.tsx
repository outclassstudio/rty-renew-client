import styled from "styled-components";
import { useSelector } from "react-redux";
import NewGiftItem from "./NewGiftItem";
import { useEffect, useState } from "react";
import StorageItem from "../Storage/StorageItem";
import { getGift } from "../../../apis/giftApi";

export const NewGiftContainer = styled.div`
  margin: 50px 10px 0;
  width: 200px;
  height: 720px;
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  const isOpenGift = useSelector(
    (state: any) => state.spaceReducer.isOpenNewGift
  );

  useEffect(() => {
    setNewList(newGiftList);
    setStorageList(storageGiftList);
  }, [newGiftList, storageGiftList]);

  console.log("newGiftBox", isOpenGiftBox, clickGiftBox);

  //newGift icon click modal msg new Gift, data newList
  //storage icon click modal msg storage Gift, data storageList
  return (
    <div>
      {isOpenGiftBox ? (
        <>
          {clickGiftBox === "new" ? (
            <>
              <NewGiftContainer>
                <h3>New Gift!</h3>
                <ItemContainer>
                  {newList &&
                    newList.map((item: any, idx: number) => {
                      return <NewGiftItem {...item} key={idx.toString()} />;
                    })}
                </ItemContainer>
              </NewGiftContainer>
            </>
          ) : null}
          {clickGiftBox === "storage" ? (
            <>
              <NewGiftContainer>
                <h3>Storage Gift!</h3>
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
    </div>
  );
}
