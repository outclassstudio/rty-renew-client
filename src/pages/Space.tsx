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
} from "../redux/reducers/spaceReducer";
import { useSelector } from "react-redux";
import { fadeAction } from "../style/global";
import { NormalBtn } from "../style/btnStyle.style";

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
  const [canSaveSpace, setCanSaveSpace] = useState(true);

  useEffect(() => {
    getMyInfo().then((res) => {
      let user = res.data.userInfo;
      if (user) {
        setMyInfo(user);
        dispatch(setUserInfo(user));
      }
    });

    if (userGiftList) {
      console.log(userGiftList, "이거먼저 확인");
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
  }, [dispatch, userGiftList]);

  //change Theme
  const changeThemeHandler = () => {
    dispatch(setModalOpen(true));
  };

  const editAvatarHandler = () => {
    setEditAvatar(!editAvatar);
  };

  const editSpaceHandler = () => {
    setEditSpace(!editSpace);
    setCanSaveSpace(true);
    dispatch(setClickBtn("editSpace"));
  };

  const saveSpaceHandler = () => {
    setCanSaveSpace(false);
    setEditSpace(false);
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
            <CanvasContainer>
              <Canvas
                giftList={spaceGiftList}
                editSpace={editSpace}
                editMove={editMove}
                canSaveSpace={canSaveSpace}
              />
              <NewGiftBox
                newGiftList={newGiftList}
                storageGiftList={storageGiftList}
              />
              <ThemeBtnBox>
                <SpaceBtn className="c" onClick={changeThemeHandler}>
                  테마 변경
                </SpaceBtn>
                <SpaceBtn
                  className={editAvatar ? "b" : "c"}
                  onClick={editAvatarHandler}
                >
                  {editAvatar ? "수정 중" : "나의 메시지 수정"}
                </SpaceBtn>
                {editSpace ? (
                  <SpaceBtn className="b" onClick={saveSpaceHandler}>
                    완료
                  </SpaceBtn>
                ) : (
                  <SpaceBtn className="c" onClick={editSpaceHandler}>
                    나의 공간 수정
                  </SpaceBtn>
                )}
              </ThemeBtnBox>
            </CanvasContainer>
          ) : null}
        </SpaceContainer>
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

const SpaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const CanvasContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 50px);
  width: 100vw;
`;

const ThemeBtnBox = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
  margin-top: 20px;
  gap: 15px;
`;

const SpaceBtn = styled(NormalBtn)`
  width: 290px;
  height: 60px;
  font-size: 16px;
`;

const AvatarWrapper = styled.div`
  position: fixed;
  margin-top: 200px;
  margin-right: 170px;
`;
