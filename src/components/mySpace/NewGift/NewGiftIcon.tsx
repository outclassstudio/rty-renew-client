import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
//import { isOpenNewGift } from "../../../redux/actions/index";
import { ReactComponent as NewGifIcon1 } from "../../../assets/images/svg/newGiftBox1.svg";
import { useEffect } from "react";
import { setOpenNewGift } from "../../../redux/reducers/spaceReducer";

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
    (state: any) => state.spaceReducer.isOpenNewGift
  );
  const newGiftLists = useSelector(
    (state: any) => state.spaceReducer.newGiftList
  );

  useEffect(() => {}, [isOpenGift, newGiftLists]);

  const openGiftHandler = () => {
    console.log("click new gift");
    dispatch(setOpenNewGift(!isOpenGift));
  };
  //console.log("-------newGiftLists", newGiftLists);
  return (
    <div>
      <GiftIconBox>
        {newGiftLists && !newGiftLists.length ? null : (
          <NewGifIcon1 onClick={openGiftHandler} />
        )}
        {isOpenGift ? "open" : "close"}
      </GiftIconBox>
      <GiftBox></GiftBox>
    </div>
  );
}
