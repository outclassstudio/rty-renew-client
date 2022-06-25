import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { BtnBox } from "../Background";
import { GiftItem } from "./GiftItem";

export default function AllGift(props: any) {
  //All Gift Modal
  const setIsAllGift = props.setIsAllGift;
  //gift 불러오기
  const [myGiftList, setMyGiftList] = useState<Array<any>>([]);
  const [selected, setSelected] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

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

  useEffect(() => {
    setMyGiftList(myGift);
  }, []);

  useEffect(() => {}, [myGiftList, selected]);

  const openModalHandler = () => {
    setIsAllGift(false);
  };

  const AllGiftHandler = () => {
    if (selected === "old") {
      const oldList = [...myGift].reverse();
      setMyGiftList(oldList);
    } else {
      setMyGiftList(myGift);
    }
    setSelectedItem("all");
  };

  const newGiftHandler = () => {
    if (selected === "old") {
      const oldList = [...newGiftList].reverse();
      setMyGiftList(oldList);
    } else {
      setMyGiftList(newGiftList);
    }
    setSelectedItem("new");
  };

  const spaceGiftHandler = () => {
    if (selected === "old") {
      const oldList = [...spaceGiftList].reverse();
      setMyGiftList(oldList);
    } else {
      setMyGiftList(spaceGiftList);
    }
    setSelectedItem("space");
  };

  const storageGiftHandler = () => {
    if (selected === "old") {
      const oldList = [...storageGiftList].reverse();
      setMyGiftList(oldList);
    } else {
      setMyGiftList(storageGiftList);
    }
    setSelectedItem("storage");
  };

  const viewGiftHandler = () => {
    setIsOpenGift(!isOpenGift);
  };

  const onChangeHandler = (e: any) => {
    setSelected(e.target.value);
    if (e.target.value === "new") {
      const copyList = [...myGiftList];
      const newList = [...copyList].reverse();
      setMyGiftList(newList);
    } else if (e.target.value === "old") {
      const copyList = [...myGiftList];
      const oldList = [...copyList].reverse();
      setMyGiftList(oldList);
    }
  };

  return (
    <ModalContainer>
      <ModalView>
        🎁받은 선물 리스트
        <BtnBox>
          <GiftAllBtn
            onClick={AllGiftHandler}
            className="all"
            itemProp={selectedItem}
          >
            All
          </GiftAllBtn>
          <GiftBtn
            onClick={newGiftHandler}
            className="new"
            itemProp={selectedItem}
          >
            New
          </GiftBtn>
          <GiftBtn
            onClick={spaceGiftHandler}
            className="space"
            itemProp={selectedItem}
          >
            Space
          </GiftBtn>
          <GiftBtn
            onClick={storageGiftHandler}
            className="storage"
            itemProp={selectedItem}
          >
            Storage
          </GiftBtn>
          <SelectBox onChange={onChangeHandler} value={selected}>
            <option value="new">최신순</option>
            <option value="old">오래된순</option>
          </SelectBox>
          {/*   <GiftBtn onClick={openModalHandler} className="c">
            닫기
  </GiftBtn>*/}
        </BtnBox>
        {/*    <NumberCarousel
          giftListData={myGiftList}
          page={page}
          handleSetPage={handleSetPage}
          color={"white"}
          pageLimit={12}
  />*/}
        <GiftItemBox>
          {myGiftList &&
            myGiftList.map((item: any, idx: number) => {
              return (
                <GiftItem
                  item={item}
                  key={idx.toString()}
                  viewGiftHandler={viewGiftHandler}
                />
              );
            })}
        </GiftItemBox>
      </ModalView>
      <ModalBackground onClick={openModalHandler}></ModalBackground>
    </ModalContainer>
  );
}

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

const SelectBox = styled.select`
  background: transparent;
  border: 1px sole;
  border: 1px solid #fff;
  border-radius: 0.6em;
  color: #f99f9f;
  height: 40px;
  font-weight: 500;
`;

export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  position: absolute;
  width: 650px;
  height: 580px;
  padding: 2rem 1rem 2rem;
  border-radius: 26px;
  background-color: #194470;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  color: white;
  font-size: 20px;
  z-index: 4;
`;

export const GiftItemBox = styled.div`
  display: grid;
  margin-top: 50px;
  min-height: 410px;
  min-width: 550px;
  margin: 30px 0 0 0;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 35px;
  padding: 15px;
  background: #04315e;
  border-radius: 5px;
  overflow: hidden;
  overflow: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const GiftAllBtn = styled.button`
  width: 100px;
  height: 40px;
  box-sizing: border-box;
  appearance: none;
  background-color: ${(props) =>
    props.itemProp === "all" ? "#f13838" : "transparent"};
  border: 2px solid #f13838;
  border-radius: 0.6em;
  color: #f9f9f9;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  &:hover {
    color: #fff;
    outline: 0;
    box-shadow: 0 0 40px 40px #f13838 inset;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  }
  &:focus {
    color: #fff;
    outline: 0;
  }
`;

export const GiftBtn = styled.button`
  width: 100px;
  height: 40px;
  box-sizing: border-box;
  appearance: none;

  border: 2px solid #7c8eff;
  border-radius: 0.6em;
  color: #f9f9f9;
  font-size: 0.8rem;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  &:hover {
    color: #fff;
    outline: 0;
    box-shadow: 0 0 40px 40px #7c8eff inset;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  }
  &:focus {
    color: #fff;
    outline: 0;
  }

  &.space {
    background-color: ${(props) =>
      props.itemProp === "space" ? "#7c8eff" : "transparent"};
  }
  &.storage {
    background-color: ${(props) =>
      props.itemProp === "storage" ? "#7c8eff" : "transparent"};
  }
  &.new {
    background-color: ${(props) =>
      props.itemProp === "new" ? "#7c8eff" : "transparent"};
  }
`;
