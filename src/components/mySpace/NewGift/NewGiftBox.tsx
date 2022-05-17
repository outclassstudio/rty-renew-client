import styled from "styled-components";
import { useSelector } from "react-redux";
import NewGiftItem from "./NewGiftItem";
import { useEffect, useState } from "react";
import StorageItem from "../Storage/StorageItem";
import { getGift } from "../../../apis/giftApi";

export const NewGiftContainer = styled.div`
  margin: 50px 20px 0;
  width: 200px;
  height: 720px;
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export function NewGiftBox(props: any) {
  const giftList = props.giftList;
  const [newList, setNewList] = useState(giftList);

  const newGiftLists = useSelector((state: any) => state.spaceReducer.myGift);
  const isOpenStorage = useSelector(
    (state: any) => state.spaceReducer.isOpenStorage
  );
  const isOpenGift = useSelector(
    (state: any) => state.spaceReducer.isOpenNewGift
  );

  const [storageList, setStorageList] = useState<any>();
  //get Item status가 storage인것만 가져오기
  useEffect(() => {
    getGift().then((res) => {
      const allData = res.data;
      const storageData = allData.filter((el) => el.status === "storage");
      console.log(storageData, "storageData", allData);
      setStorageList(storageData);
    });
  }, []);
  useEffect(() => {
    setNewList(giftList);
  }, [giftList]);

  return (
    <div>
      {isOpenGift ? (
        <>
          <NewGiftContainer>
            <h4>GiftBox Component</h4>
            <h3>New Gift!</h3>
            <ItemContainer>
              {newList &&
                newList.map((item: any, idx: number) => {
                  return <NewGiftItem {...item} key={idx.toString()} />;
                })}
            </ItemContainer>
          </NewGiftContainer>
        </>
      ) : null}
      {isOpenStorage ? (
        <>
          <NewGiftContainer>
            <h4>Storage Component</h4>
            <h3>Storage Gift!</h3>
            <ItemContainer>
              {storageList &&
                storageList.map((item: any, idx: number) => {
                  return <StorageItem item={item} key={idx} />;
                })}
            </ItemContainer>
          </NewGiftContainer>
        </>
      ) : null}
    </div>
  );
}
