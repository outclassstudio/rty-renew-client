import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as NewGifIcon1 } from "../../../assets/images/svg/newGiftBox1.svg";
import { setOpenGiftBox } from "../../../redux/reducers/spaceReducer";
import { colorSet } from "../../../style/global";

export default function NewGift() {
  const dispatch = useDispatch();
  const isOpenGiftBox = useSelector(
    (state: any) => state.spaceReducer.isOpenGiftBox
  );
  const newGiftList = useSelector((state: any) => state.spaceReducer.newGift);

  const openGiftHandler = () => {
    dispatch(setOpenGiftBox(!isOpenGiftBox));
    // dispatch(setClickGiftBox("new"));
  };

  return (
    <div>
      <GiftIconBox>
        <GiftCount>{newGiftList?.length}</GiftCount>
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
  font-weight: 900;
  font-size: 20px;
  color: white;
  background: ${colorSet.darkPink};
  width: 36px;
  height: 36px;
  border-radius: 18px;
`;
