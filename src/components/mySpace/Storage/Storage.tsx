import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getGift } from "../../../apis/giftApi";
import { ReactComponent as StorageICon } from "../../../assets/images/svg/storage.svg";
import { ReactComponent as OpenBox } from "../../../assets/images/svg/openBox.svg";
import { ReactComponent as CloseBox } from "../../../assets/images/svg/closeBox.svg";
import { ReactComponent as Minus } from "../../../assets/images/svg/minus.svg";
import { ReactComponent as Plus } from "../../../assets/images/svg/plus.svg";
import {
  setClickGiftBox,
  setOpenGiftBox,
  setIsOpenSave,
} from "../../../redux/reducers/spaceReducer";

export const StorageContainer = styled.div`
  width: 100px;
  height: 150px;
  position: fixed;
  margin-top: 610px;
  margin-left: 1145px;
  cursor: pointer;
`;

export const ShowBox = styled.div``;

export function Storage(props: any) {
  const dispatch = useDispatch();
  const isEditSpace = props.isEditSpace;
  //storage clcick -> stroagebox 열기

  //const [isOpenStorage, setIsOpenStorage] = useState<boolean>(false);
  // const [storageList, setStorageList] = useState<any>();
  const [isShowStorage, setIsShowStorage] = useState<Boolean>(false);
  //get Item status가 storage인것만 가져오기
  useEffect(() => {
    // getGift().then((res) => {
    //   const allData = res.data;
    //   const storageData = allData.filter((el) => el.status === "storage");
    //   console.log(isShowStorage, "storageData", allData);
    //   setStorageList(storageData);
    // });
  }, [isShowStorage]);

  const isOpenGiftBox = useSelector(
    (state: any) => state.spaceReducer.isOpenGiftBox
  );

  const isOpenTrash = useSelector(
    (state: any) => state.spaceReducer.isOpenTrash
  );

  const isOpenSave = useSelector((state: any) => state.spaceReducer.isOpenSave);

  const isOpenHandler = () => {
    dispatch(setOpenGiftBox(!isOpenGiftBox));
    dispatch(setClickGiftBox("storage"));
  };

  const isShowHandler = () => {
    setIsShowStorage(!isShowStorage);
  };

  const clickBoxHandler = () => {
    dispatch(setIsOpenSave(!isOpenSave));
  };

  return (
    <>
      {isEditSpace ? (
        <>
          {isOpenTrash ? null : (
            <>
              {isOpenSave ? (
                <StorageContainer>
                  <OpenBox onClick={clickBoxHandler} />
                </StorageContainer>
              ) : (
                <StorageContainer>
                  <CloseBox onClick={clickBoxHandler} />
                </StorageContainer>
              )}
            </>
          )}
        </>
      ) : (
        <StorageContainer>
          {isShowStorage ? (
            <ShowBox>
              <Minus onClick={isShowHandler} />
            </ShowBox>
          ) : (
            <ShowBox>
              <Plus onClick={isShowHandler} />
            </ShowBox>
          )}
          {isShowStorage ? <StorageICon onClick={isOpenHandler} /> : null}
        </StorageContainer>
      )}
    </>
  );
}
