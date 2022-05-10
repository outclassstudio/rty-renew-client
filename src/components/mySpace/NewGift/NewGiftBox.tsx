import styled from "styled-components";
import { useSelector } from "react-redux";
//import { giftItemList } from "../../../utils/giftItemList";
import NewGiftItem from "./NewGiftItem";
import { useEffect, useState } from "react";

export const NewGiftContainer = styled.div`
  margin: 50px 20px 0;
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

export function NewGiftBox() {
  const isOpenGift = useSelector(
    (state: any) => state.spaceReducer.isOpenNewGift.boolean
  );
  const newGiftLists = useSelector(
    (state: any) => state.spaceReducer.newGiftList
  );
  const [giftList, setGiftList] = useState(newGiftLists);
  console.log("giftList", newGiftLists.item);
  useEffect(() => {
    console.log(" 실행?", newGiftLists);
  }, [newGiftLists]);

  return (
    <div>
      {isOpenGift && newGiftLists.length !== 0 ? (
        <>
          <NewGiftContainer>
            <h4>GiftBox Component</h4>
            <h3>New Gift!</h3>
            <ItemContainer>
              {newGiftLists &&
                newGiftLists.map((item: any, idx: number) => {
                  return <NewGiftItem {...item} key={idx.toString()} />;
                })}
            </ItemContainer>
          </NewGiftContainer>
        </>
      ) : null}
    </div>
  );
}
