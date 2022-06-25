import { useNavigate } from "react-router";
import styled from "styled-components";

export function GiftItem(props: any) {
  // const item = props.item;
  const navigate = useNavigate();

  const svgStr = props.item.svg;
  const svg = new Blob([svgStr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svg);
  const date = props.item.date.substr(0, 10);

  const visitHandler = () => {
    navigate(`/visit/${props.item.userFrom}`);
  };

  return (
    <>
      <ItemBox>
        <ImgBox>
          <img src={url} alt="giftItem" />
        </ImgBox>
        <P className="visit" onClick={visitHandler}>
          From.{props.item.userFrom}
        </P>
        <P>{date}</P>
      </ItemBox>
    </>
  );
}

export const ItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 140px;
  height: 130px;

  padding: 5px;
`;

export const ImgBox = styled.div`
  width: 75px;
  height: 90px;
  margin-bottom: 5px;
`;

export const P = styled.p`
  margin: 1px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  &.visit {
    cursor: pointer;
  }
`;
