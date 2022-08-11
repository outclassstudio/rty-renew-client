import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as NewGifIcon1 } from "../../../assets/images/svg/newGiftBox1.svg";
import { useEffect, useState } from "react";
import {
  setClickGiftBox,
  setNewGift,
  setOpenGiftBox,
} from "../../../redux/reducers/spaceReducer";
import { colorSet } from "../../../style/global";
import { getMyGift } from "../../../apis/giftApi";

export default function NewGift() {
  // new giftbox의 길이가 0이 아닐 때
  //새로 받은 선물함 아이콘이 있다.
  //선물함을 클릭하면 선물함 리스트 컴포넌트가 보인다.
  const dispatch = useDispatch();

  const isOpenGiftBox = useSelector(
    (state: any) => state.spaceReducer.isOpenGiftBox
  );

  const newGiftList = useSelector(
    (state: any) => state.spaceReducer.newGiftList
  );

  const giftLists = useSelector((state: any) => state.spaceReducer.myGift);
  const newGiftLists = giftLists.filter((el: any) => el.status === "new");

  const [newList, setNewList] = useState<any>([]);

  useEffect(() => {
    setNewList(newGiftLists);
  }, []);

  useEffect(() => {
    setNewList(newGiftList);
  }, [newGiftList, isOpenGiftBox]);

  const openGiftHandler = () => {
    getMyGift().then((res) => {
      if (res.data.gift) {
        const storge = res.data.gift.filter((el) => el.status === "new");
        dispatch(setNewGift(storge));
      }
    });
    dispatch(setOpenGiftBox(!isOpenGiftBox));
    dispatch(setClickGiftBox("new"));
  };

  return (
    <div>
      <GiftIconBox>
        <>
          <GiftCount>{newList.length}</GiftCount>
          <NewGifIcon1 onClick={openGiftHandler} />
        </>
      </GiftIconBox>
      <GiftBox></GiftBox>
    </div>
  );
}

export const GiftIconBox = styled.div`
  position: absolute;
  margin-top: 20px;
  margin-left: 1160px;
  width: 90px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: end;
  user-select: none;
`;

export const GiftBox = styled.div`
  width: 200px;
  background-color: red;
`;

export const GiftCount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  margin-top: 60px;
  /* margin-left: 20px; */
  font-weight: 900;
  font-size: 20px;
  color: white;
  background: ${colorSet.darkPink};
  width: 36px;
  height: 36px;
  border-radius: 18px;
  /* padding-bottom: 2px; */
`;
