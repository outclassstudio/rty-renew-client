import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as NewGifIcon1 } from "../../../assets/images/svg/newGiftBox1.svg";
import { useEffect, useState } from "react";
import {
  setClickGiftBox,
  setOpenGiftBox,
} from "../../../redux/reducers/spaceReducer";
import { colorSet } from "../../../style/global";

export default function NewGift() {
  const dispatch = useDispatch();
  const isOpenGiftBox = useSelector(
    (state: any) => state.spaceReducer.isOpenGiftBox
  );
  const giftLists = useSelector((state: any) => state.spaceReducer.myGift);
  const newGiftLists = giftLists?.filter((el: any) => el.status === "new");
  const [newList, setNewList] = useState<any>([]);

  useEffect(() => {
    setNewList(newGiftLists);
  }, [giftLists]);

  const openGiftHandler = () => {
    dispatch(setOpenGiftBox(!isOpenGiftBox));
    dispatch(setClickGiftBox("new"));
  };

  return (
    <div>
      <GiftIconBox>
        <GiftCount>{newList?.length}</GiftCount>
        <NewGifIcon1 onClick={openGiftHandler} />
      </GiftIconBox>
      <GiftBox></GiftBox>
    </div>
  );
}

export const GiftIconBox = styled.div`
  position: fixed;
  margin-top: 20px;
  margin-left: 470px;
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
