import styled from "styled-components";

export const ItemBox = styled.div`
  width: 100px;
  margin: 15px;
  background: transparent;
  cursor: grab;
`;

export const ItemP = styled.p`
  width: 100px;
  margin: 15px;
`;

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
        <ItemP>{item.userFrom}</ItemP>
        <img src={url} alt="giftItem" />
      </ItemBox>
    </>
  );
};

export default NewGiftItem;
