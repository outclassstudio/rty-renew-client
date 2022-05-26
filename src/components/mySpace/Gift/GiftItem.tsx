import styled from "styled-components";

export const ItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 200px;
`;

export const ImgBox = styled.div`
  width: 100px;
  height: 100px;
`;

export const P = styled.p`
  margin-top: 10px;
  font-weight: 900;
`;

export function GiftItem(giftInfo: any) {
  const svgStr = giftInfo.svg;
  const svg = new Blob([svgStr], { type: "image/svg+xml" });
  const url = URL.createObjectURL(svg);

  return (
    <>
      <ItemBox>
        <ImgBox>
          <img src={url} alt="giftItem" />
        </ImgBox>
        <P>From.{giftInfo.userFrom}</P>
      </ItemBox>
    </>
  );
}
