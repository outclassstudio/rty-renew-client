import styled from "styled-components";

const StorageItem = (props: any) => {
  const data = props.item;
  const svgStr = data.svg;
  const svg = new Blob([svgStr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svg);

  const dragStartHandler = (e: any, item: number) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("id", item);
  };

  return (
    <div>
      <ItemBox
        draggable
        onDragStart={(e: any) => dragStartHandler(e, data.idx)}
      >
        <ItemP>From. {data.userFrom}</ItemP>
        <img src={url} alt="giftItem" />
      </ItemBox>
    </div>
  );
};

export default StorageItem;

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
