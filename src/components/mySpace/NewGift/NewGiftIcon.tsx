import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { isOpenNewGift } from "../../../redux/actions/index";
import NewGifts from "../../../assets/images/svg/newGiftBox.svg";
import { ReactComponent as NewGifIcon1 } from "../../../assets/images/svg/newGiftBox1.svg";
import { useEffect } from "react";

export const GiftIconBox = styled.div`
  position: absolute;
  top: 170px;
  right: 450px;
  width: 80px;
  cursor: pointer;
`;

export const GiftBox = styled.div`
  width: 200px;
  background-color: red;
`;

export default function NewGift() {
  // new giftbox의 길이가 0이 아닐 때
  //새로 받은 선물함 아이콘이 있다.
  //선물함을 클릭하면 선물함 리스트 컴포넌트가 보인다.
  const dispatch = useDispatch();
  const isOpenGift = useSelector(
    (state: any) => state.spaceReducer.isOpenNewGift.boolean
  );
  console.log(isOpenGift);
  useEffect(() => {}, [isOpenGift]);

  const openGiftHandler = () => {
    console.log("click new gift");
    dispatch(isOpenNewGift(!isOpenGift));
  };
  return (
    <div>
      <GiftIconBox>
        <NewGifIcon1 onClick={openGiftHandler} />
        {isOpenGift ? "open" : "close"}
        {/*img src={NewGifts} alt="giftBox" /> */}
      </GiftIconBox>
      <GiftBox></GiftBox>
    </div>
  );
}
