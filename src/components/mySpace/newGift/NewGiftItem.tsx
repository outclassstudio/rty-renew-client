import { DragEvent } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../../constants";
import { colorSet } from "../../../style/global";

const NewGiftItem = (item: any) => {
  const itemId = item.id;

  const dragStartHandler = (e: DragEvent<HTMLDivElement>, item: number) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("id", item.toString());
  };
  const url = item.svg.data;

  return (
    <ItemBox
      draggable
      onDragStart={(e: DragEvent<HTMLDivElement>) =>
        dragStartHandler(e, itemId)
      }
    >
      <ItemP>From. {item.userFrom.nickname}</ItemP>
      <img src={`${BASE_URL}${url}`} alt="giftItem" />
    </ItemBox>
  );
};

export default NewGiftItem;

export const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: grab;
  width: 100%;
  margin-bottom: 20px;
  img {
    width: 100px;
  }
`;

export const ItemP = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colorSet.darkPink};
  color: white;
  border-radius: 10px;
  padding: 0px 10px;
  margin: 12px 0px 5px 0px;
  font-size: 14px;
`;
