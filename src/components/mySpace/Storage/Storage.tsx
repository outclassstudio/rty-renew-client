import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getGift } from "../../../apis/giftApi";
import { ReactComponent as StorageICon } from "../../../assets/images/svg/storage.svg";
import { setOpenStorage } from "../../../redux/reducers/spaceReducer";
import { StorageBox } from "./StorageBox";

export const StorageContainer = styled.div`
  width: 100px;
  height: 150px;
  position: fixed;
  top: 700px;
  left: 1550px;
  cursor: pointer;
`;

export function Storage() {
  const dispatch = useDispatch();
  //storage clcick -> stroagebox 열기

  //const [isOpenStorage, setIsOpenStorage] = useState<boolean>(false);
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
  const isOpenStorage = useSelector(
    (state: any) => state.spaceReducer.isOpenStorage
  );
  const isOpenHandler = () => {
    //setIsOpenStorage(!isOpenStorage);
    dispatch(setOpenStorage(!isOpenStorage));
    console.log("sotrage oepen", isOpenStorage, storageList);
  };

  console.log(isOpenStorage, "isOpenStorage");
  return (
    <StorageContainer onClick={isOpenHandler}>
      <StorageICon />
    </StorageContainer>
  );
}
