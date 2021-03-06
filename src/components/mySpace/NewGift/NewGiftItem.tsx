import styled from "styled-components";
import { colorSet } from "../../../style/global";

const NewGiftItem = (item: any) => {
  const itemId = item.idx;

  const dragStartHandler = (e: any, item: number) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("id", item);
  };
  const svgStr = item.svg;
  const svg = new Blob([svgStr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svg);

  return (
    <>
      <ItemBox draggable onDragStart={(e: any) => dragStartHandler(e, itemId)}>
        <ItemP>From. {item.userFrom}</ItemP>
        <img src={url} alt="giftItem" />
      </ItemBox>
    </>
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
