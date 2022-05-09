import styled from "styled-components";
import { useSelector } from "react-redux";
import { giftItemList } from "../../../utils/giftItemList";
import NewGiftItem from "./NewGiftItem";

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
  console.log("giftbox show", isOpenGift, giftItemList);

  return (
    <div>
      {isOpenGift ? (
        <>
          <NewGiftContainer>
            <h4>GiftBox Component</h4>
            <h3>New Gift!</h3>
            <ItemContainer>
              {giftItemList.map((item, idx: number) => {
                return <NewGiftItem {...item} key={idx.toString()} />;
              })}
            </ItemContainer>
          </NewGiftContainer>
        </>
      ) : null}
    </div>
  );
}
