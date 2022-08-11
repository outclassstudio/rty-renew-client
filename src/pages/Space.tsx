import styled from "styled-components";
import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/userApi";
import Canvas from "../components/mySpace/Canvas";
import { NewGiftBox } from "../components/mySpace/newGift/NewGiftBox";
import Layout from "./Layout";
import { Avatar } from "../components/mySpace/Avatar";
import { useDispatch } from "react-redux";
import {
  setClickBtn,
  setModalOpen,
  setNewGift,
  setSpaceGift,
  setStorageGift,
  setUserInfo,
  setIsRandom,
} from "../redux/reducers/spaceReducer";
import { useSelector } from "react-redux";
import { fadeAction } from "../style/global";

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
    getMyInfo().then((res) => {
      let user = res.data.userInfo;
      if (user) {
        setMyInfo(user);
        dispatch(setUserInfo(user));
      }
    });

    if (userGiftList) {
      const newGift = userGiftList.filter(
        (item: { status: string }) => item.status === "new"
      );
      dispatch(setNewGift(newGift));
      setNewGiftList(newGift);

      const space = userGiftList.filter(
        (item: { status: string }) => item.status === "space"
      );
      setSpaceGiftList(space);
      dispatch(setSpaceGift(space));

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
    setSaveSpace(true);
    setEditSpace(false);
  };

  const randomHandler = () => {
    //canvas icon random
    dispatch(setIsRandom(true));
  };

  return (
    <Layout title={"내 공간"}>
      <MainContainer>
        <SpaceContainer>
          <AvatarWrapper>
            <Avatar
              editAvatar={editAvatar}
              setEditAvatar={setEditAvatar}
              myInfo={myInfo}
            />
          </AvatarWrapper>
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
          <Button onClick={changeThemeHandler}>테마 변경</Button>
          <Button onClick={editAvatarHandler}>
            {editAvatar ? "수정 중" : "나의 메시지 수정"}
          </Button>
          {editSpace ? (
            <Button onClick={randomHandler}>랜덤 배치</Button>
          ) : null}
          {editSpace ? (
            <Button
              className={editSpace ? "cliked" : ""}
              onClick={saveSpaceHandler}
            >
              완료
            </Button>
          ) : (
            <Button onClick={editSpaceHandler}>나의 공간 수정</Button>
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

export const SpaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const ThemeBtnBox = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
  margin-top: 20px;
`;

export const Button = styled.button`
  width: 290px;
  height: 60px;
  cursor: pointer;
  background: #194470;
  border-radius: 5px;
  border: transparent;
  font-size: medium;
  font-weight: 500;
  font-size: 17px;
  color: white;
  border: 4px solid #194470;
  margin-right: 20px;

  &:hover {
    box-shadow: 0 0 40px 40px #fff inset;
    color: #194470;
  }
  &.cliked {
    background: #7c8eff;
  }
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

const AvatarWrapper = styled.div`
  position: fixed;
  margin-top: 250px;
  margin-right: 170px;
`;
