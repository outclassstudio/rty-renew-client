import styled from "styled-components";
import { useEffect, useState } from "react";
import { getUserInfo } from "../apis/userApi";
import Canvas from "../components/mySpace/Canvas";
import { NewGiftBox } from "../components/mySpace/NewGift/NewGiftBox";
import Layout from "./Layout";
import { Avatar } from "../components/mySpace/Avatar";
import { useDispatch } from "react-redux";
import {
  setClickBtn,
  setModalOpen,
  setStorageGift,
  setUserInfo,
} from "../redux/reducers/spaceReducer";
import { userInfo } from "../redux/actions";
import { useSelector } from "react-redux";
import { NormalBtn } from "../style/btnStyle.style";
import { fadeAction } from "../style/global";
import React from "react";

export const SpaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const ThemeBtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

export const Button = styled.button`
  width: 290px;
  height: 70px;
  margin: 15px;
  cursor: pointer;
  background: darkorange;
  border-radius: 10px;
  border: transparent;
  font-size: medium;
`;

export const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Nickname = styled.h2`
  margin-right: 20px;
`;
export default function Space() {
  const dispatch = useDispatch();

  const userGiftList = useSelector((state: any) => state.spaceReducer.myGift);

  const [isEachGift, setIsEachGift] = useState(false);
  const [myInfo, setMyInfo] = useState<any>();
  const [newGiftList, setNewGiftList] = useState<any>();
  const [spaceGiftList, setSpaceGiftList] = useState<any>();
  const [storageGiftList, setStorageGiftList] = useState<any>();
  const [editAvatar, setEditAvatar] = useState(false);
  const [editSpace, setEditSpace] = useState(false);
  const [editMove, setEditMove] = useState(false);
  const [saveSpace, setSaveSpace] = useState(true);

  useEffect(() => {
    getUserInfo().then((res) => {
      let user = res.data;
      setMyInfo(user);
      dispatch(setUserInfo(user));
    });
    console.log("spapce", userGiftList);

    if (userGiftList) {
      const newGift = userGiftList.filter(
        (item: { status: string }) => item.status === "new"
      );
      setNewGiftList(newGift);
      const space = userGiftList.filter(
        (item: { status: string }) => item.status === "space"
      );
      setSpaceGiftList(space);

      const storage = userGiftList.filter(
        (item: { status: string }) => item.status === "storage"
      );
      dispatch(setStorageGift(storage));
      setStorageGiftList(storage);
    }

    if (userGiftList) {
      setIsEachGift(true);
    }
    // dispatch(setMyGift(gift));
  }, [dispatch, userGiftList]);

  console.log("new", newGiftList, "space", spaceGiftList, "myInfo", myInfo);
  //change Theme
  const changeThemeHandler = () => {
    dispatch(setModalOpen(true));
  };

  const editAvatarHandler = () => {
    setEditAvatar(!editAvatar);
  };

  const editSpaceHandler = () => {
    //editSpace 가  true일 때만
    //canvas에 붙은 svg 값을 보낸다.
    setEditSpace(!editSpace);
    setSaveSpace(false);
    dispatch(setClickBtn("editSpace"));
  };

  const saveSpaceHandler = () => {
    console.log("clickssss");
    setSaveSpace(true);
    setEditSpace(false);
  };
  console.log("moveeditttt", editMove);
  return (
    <Layout title={"내공간"}>
      <MainContainer>
        <SpaceContainer>
          <Avatar
            editAvatar={editAvatar}
            setEditAvatar={setEditAvatar}
            myInfo={myInfo}
          />
          {isEachGift ? (
            <>
              <Canvas
                giftList={spaceGiftList}
                editSpace={editSpace}
                editMove={editMove}
                saveSpace={saveSpace}
              />
              <NewGiftBox
                newGiftList={newGiftList}
                storageGiftList={storageGiftList}
              />
            </>
          ) : null}
        </SpaceContainer>
        <ThemeBtnBox>
          <NormalBtn
            className="a"
            width={"300px"}
            height={"50px"}
            onClick={changeThemeHandler}
          >
            테마 변경
          </NormalBtn>
          <NormalBtn
            className="a"
            width={"300px"}
            height={"50px"}
            onClick={editAvatarHandler}
          >
            {editAvatar ? "수정 중" : "나의 메시지 수정"}
          </NormalBtn>

          {editSpace ? (
            <NormalBtn
              className={editSpace ? "b" : "a"}
              width={"300px"}
              height={"50px"}
              onClick={saveSpaceHandler}
            >
              완료
            </NormalBtn>
          ) : (
            <NormalBtn
              className={editSpace ? "b" : "a"}
              width={"300px"}
              height={"50px"}
              onClick={editSpaceHandler}
            >
              나의 공간 수정
            </NormalBtn>
          )}
        </ThemeBtnBox>
      </MainContainer>
    </Layout>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeAction} 0.6s ease-in-out;
  height: calc(100vh - 50px);
`;
