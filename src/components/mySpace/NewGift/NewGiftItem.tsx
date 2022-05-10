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
  console.log("list", item);
  const itemId = item.id;

  const dragStartHandler = (e: any, item: number) => {
    console.log(e, "start", item);
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("id", item);
  };

  return (
    <>
      <ItemBox draggable onDragStart={(e: any) => dragStartHandler(e, itemId)}>
        <ItemP>from. 효영</ItemP>
        <img src={item.url} alt="giftItem" />
      </ItemBox>
    </>
  );
};

export default NewGiftItem;
