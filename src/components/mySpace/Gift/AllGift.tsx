import { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BtnBox } from "../Background";
import { GiftItem } from "./GiftItem";

export const ModalBackground = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
`;

export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 700px;
  height: 600px;
  padding: 2rem 1rem 2rem;
  overflow: scroll;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background-color: #efefef;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @media screen and (max-width: 480px) {
    width: 70%;
  }
`;

export const GiftItemBox = styled.div`
  display: flex;
  margin-top: 50px;
  max-width: 700px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 16px;
  padding: 0 20px;
`;

// export const Img = styled.img`
//   width: 100%;
//   height: 100%;
// `;

export const GiftBtn = styled.button`
  width: 89px;
  height: 40px;
  border-radius: 10px;
`;

export function AllGift(props: any) {
  //All Gift Modal
  const setIsAllGift = props.setIsAllGift;
  //gift 불러오기

  const myGift = useSelector((state: any) => state.spaceReducer.myGift);

  const newGiftList = useSelector(
    (state: any) => state.spaceReducer.newGiftList
  );

  const storageGiftList = useSelector(
    (state: any) => state.spaceReducer.storageGiftList
  );

  const spaceGiftList = useSelector(
    (state: any) => state.spaceReducer.spaceGiftList
  );

  console.log(
    "AllGift",
    myGift,
    "new",
    newGiftList,
    "storage",
    storageGiftList,
    " space",
    spaceGiftList
  );
  useEffect(() => {
    console.log(myGift);
  }, [myGift, newGiftList, storageGiftList, spaceGiftList]);

  const openModalHandler = () => {
    setIsAllGift(false);
  };

  return (
    <>
      <ModalBackground onClick={openModalHandler}>
        <ModalView>
          <BtnBox>
            <GiftBtn>All</GiftBtn>
            <GiftBtn>New</GiftBtn>
            <GiftBtn>Space</GiftBtn>
            <GiftBtn>Storage</GiftBtn>
          </BtnBox>
          <GiftItemBox>
            {myGift &&
              myGift.map((giftInfo: any, idx: number) => {
                return <GiftItem {...giftInfo} key={idx.toString()} />;
              })}
          </GiftItemBox>
        </ModalView>
      </ModalBackground>
    </>
  );
}
