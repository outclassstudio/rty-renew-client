import { useState } from "react";
import { Gift } from "./Gift";
import styled from "styled-components";

export const ItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 140px;
  height: 130px;
`;

export const ImgBox = styled.div`
  width: 90px;
  height: 90px;
`;

export const P = styled.p`
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  color: white;
`;

export function GiftItem(props: any) {
  // const item = props.item;

  const clickBtn = props.viewGiftHandler;
  const svgStr = props.item.svg;
  const svg = new Blob([svgStr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svg);
  props.setClickedItem(props.item);

  const itemClickHandler = () => {};

  return (
    <>
      <ItemBox>
        <ImgBox onClick={clickBtn}>
          <img src={url} alt="giftItem" />
        </ImgBox>
<<<<<<< HEAD
        <P>From.{props.item.userFrom}</P>
=======
        <P>From. {giftInfo.userFrom}</P>
>>>>>>> 415179685243a5157ad8679fd8e3fcd4269f1fbd
      </ItemBox>
    </>
  );
}
