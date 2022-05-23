import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getGift } from "../../../apis/giftApi";
import { ReactComponent as StorageICon } from "../../../assets/images/svg/storage.svg";
import { ReactComponent as OpenBox } from "../../../assets/images/svg/openBox.svg";
import { ReactComponent as CloseBox } from "../../../assets/images/svg/closeBox.svg";
import {
  setClickGiftBox,
  setOpenGiftBox,
  setIsOpenSave,
} from "../../../redux/reducers/spaceReducer";

export const StorageContainer = styled.div`
  position: fixed;
  margin-top: 115px;
  margin-left: 1165px;
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
                  <OpenBox width="85" fill="white" onClick={clickBoxHandler} />
                </StorageContainer>
              ) : (
                <StorageContainer>
                  <CloseBox fill="white" onClick={clickBoxHandler} />
                </StorageContainer>
              )}
            </>
          )}
        </>
      ) : (
        <StorageContainer>
          {isShowStorage ? (
            <ShowBox>
              <Minus
                src={
                  "https://cdn.discordapp.com/attachments/974114424036155505/978184305668923402/minus.png"
                }
                onClick={isShowHandler}
              />
            </ShowBox>
          ) : (
            <ShowBox>
              <Plus
                src={
                  "https://cdn.discordapp.com/attachments/974114424036155505/978184305916403762/plus.png"
                }
                onClick={isShowHandler}
              />
            </ShowBox>
          )}
          {isShowStorage ? <StorageICon onClick={isOpenHandler} /> : null}
        </StorageContainer>
      )}
    </>
  );
}

const Minus = styled.img`
  width: 20px;
`;

const Plus = styled.img`
  width: 20px;
`;
