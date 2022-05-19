import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  width: 400px;
  padding: 2rem 1rem 2rem;
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

export const ImgBox = styled.div`
  width: 300px;
  height: 200px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export function Gift(props: any) {
  //Gift Modal

  //gift 불러오기
  const newGiftLists = useSelector((state: any) => state.spaceReducer.myGift);
  useEffect(() => {
    console.log(newGiftLists);
  }, [newGiftLists]);

  const newGifts = props.item;
  const id = props.id;
  console.log(newGifts, "선물 줘", id);

  const openGiftArr = newGifts.filter((item: any) => {
    return item.id === id;
  });
  const openGift = openGiftArr[0].gift;
  console.log("gift!!!!!!!!!!!111", openGift.gift);
  const closeModalHandler = () => {
    console.log("close");
    props.setIsOpenGift(false);
  };

  return (
    <ModalBackground onClick={closeModalHandler}>
      <ModalView>
        <h2>Gift</h2>
        <p>To. {openGift.userTo}</p>
        <p>From . {openGift.userFrom}</p>
        <ImgBox>
          <Img src={openGift.img} alt="giftImg" />
        </ImgBox>

        <p>content : {openGift.content}</p>
      </ModalView>
    </ModalBackground>
  );
}
