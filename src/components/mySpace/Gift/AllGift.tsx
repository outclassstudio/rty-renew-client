import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { NormalBtn } from "../../../style/btnStyle.style";
import { colorSet } from "../../../style/global";
import NumberCarousel from "../../GiftList/NumberCarousel";
import { BtnBox } from "../Background";
import { GiftItem } from "./GiftItem";
import { Gift } from "./Gift";

export const ModalContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ModalBackground = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: 3;
`;

export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  position: absolute;
  width: 700px;
  height: 600px;
  padding: 2rem 1rem 2rem;
  border-radius: 10px;
  border-radius: 6px;
  background-color: ${colorSet.purple};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  color: white;
  font-size: 20px;
  z-index: 4;

  @media screen and (max-width: 480px) {
    width: 70%;
  }
`;

export const GiftItemBox = styled.div`
  display: grid;
  margin-top: 50px;
  max-width: 700px;
  margin: 0 auto;
  /* display: grid; */
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  gap: 25px;
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
  border: none;
  font-weight: bold;
`;

export default function AllGift(props: any) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(12);

  //번호선택 및 범위지정
  const handleSetPage = (page: number) => {
    setStart((page - 1) * 12);
    setEnd(page * 12);
    setPage(page);
  };

  //All Gift Modal
  const setIsAllGift = props.setIsAllGift;
  //gift 불러오기
  const [myGiftList, setMyGiftList] = useState([]);

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

  const [isOpenGift, setIsOpenGift] = useState(false);
  const [clickedItem, setClickedItem] = useState();

  useEffect(() => {
    setMyGiftList(myGift);
  }, []);

  useEffect(() => {
    console.log(myGift);
  }, [myGiftList]);

  const openModalHandler = () => {
    setIsAllGift(false);
  };

  const AllGiftHandler = () => {
    setMyGiftList(myGift);
  };

  const newGiftHandler = () => {
    setMyGiftList(newGiftList);
  };

  const spaceGiftHandler = () => {
    setMyGiftList(spaceGiftList);
  };

  const storageGiftHandler = () => {
    setMyGiftList(storageGiftList);
  };

  const viewGiftHandler = () => {
    console.log("viewGiftHandler", isOpenGift);
    setIsOpenGift(!isOpenGift);
  };

  return (
    <ModalContainer>
      <ModalView>
        🎁받은 선물 리스트
        <BtnBox>
          <NormalBtn
            onClick={AllGiftHandler}
            className="b"
            width={"110px"}
            height={"40px"}
          >
            All
          </NormalBtn>
          <NormalBtn
            onClick={newGiftHandler}
            className="c"
            width={"110px"}
            height={"40px"}
          >
            New
          </NormalBtn>
          <NormalBtn
            onClick={spaceGiftHandler}
            className="c"
            width={"110px"}
            height={"40px"}
          >
            Space
          </NormalBtn>
          <NormalBtn
            onClick={storageGiftHandler}
            className="c"
            width={"110px"}
            height={"40px"}
          >
            Storage
          </NormalBtn>
          <NormalBtn
            onClick={openModalHandler}
            className="c"
            width={"110px"}
            height={"40px"}
          >
            닫기
          </NormalBtn>
        </BtnBox>
        <NumberCarousel
          giftListData={myGiftList}
          page={page}
          handleSetPage={handleSetPage}
          color={"white"}
          pageLimit={12}
        />
        <GiftItemBox>
          {myGiftList &&
            myGiftList.slice(start, end).map((item: any, idx: number) => {
              return (
                <GiftItem
                  item={item}
                  key={idx.toString()}
                  viewGiftHandler={viewGiftHandler}
                  setClickedItem={setClickedItem}
                />
              );
            })}
        </GiftItemBox>
      </ModalView>
      <ModalBackground onClick={openModalHandler}></ModalBackground>
    </ModalContainer>
  );
}
