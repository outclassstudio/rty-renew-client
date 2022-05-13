import styled from "styled-components";
import { useSelector } from "react-redux";
import NewGiftItem from "./NewGiftItem";
import { useEffect, useState } from "react";
import { getGift } from "../../../apis/giftApi";
import { setMyGift } from "../../../redux/reducers/spaceReducer";
import { useDispatch } from "react-redux";

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

export function NewGiftBox(props: any) {
  console.log("box", props);
  const giftList = props.giftList;
  const [newList, setNewList] = useState(giftList);

  const newGiftLists = useSelector((state: any) => state.spaceReducer.myGift);

  const isOpenGift = useSelector(
    (state: any) => state.spaceReducer.isOpenNewGift
  );
  useEffect(() => {
    setNewList(giftList);
  }, []);

  console.log("giftList", newGiftLists, newList, giftList);

  return (
    <div>
      {isOpenGift ? (
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
