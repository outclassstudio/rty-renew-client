import styled from "styled-components";
import { useEffect, useState } from "react";
import { getUserInfo } from "../apis/userApi";
import NewGift from "../components/mySpace/NewGift/NewGiftIcon";
import Canvas from "../components/mySpace/Canvas";
import { NewGiftBox } from "../components/mySpace/NewGift/NewGiftBox";
import Layout from "./Layout";
import { Avatar } from "../components/mySpace/Avatar";
import { useDispatch } from "react-redux";
import { setModalOpen, setMyGift } from "../redux/reducers/spaceReducer";
import { getGift } from "../apis/giftApi";
import { userInfo } from "../redux/actions";
import { useSelector } from "react-redux";

export const SpaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
export const ThemeBtnBox = styled.div`
  display: flex;
  justify-content: center;
  top: 840px;
  left: 200px;
`;

export const Button = styled.button`
  width: 300px;
  height: 70px;
  margin: 15px;
  cursor: pointer;
  background: darkorange;
  border-radius: 10px;
  border: transparent;
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

  useEffect(() => {
    getUserInfo().then((res) => {
      let user = res.data;
      setMyInfo(user);
      dispatch(userInfo(user));
    });
    console.log("spapce", userGiftList);
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

    setStorageGiftList(storage);
    if (userGiftList) {
      setIsEachGift(true);
    }
    // dispatch(setMyGift(gift));
  }, [userGiftList]);

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
  };
  return (
    <>
      <Layout> </Layout>
      <SpaceContainer>
        <Avatar
          editAvatar={editAvatar}
          setEditAvatar={setEditAvatar}
          myInfo={myInfo}
        />
        {isEachGift ? (
          <>
            <Canvas giftList={spaceGiftList} editSpace={editSpace} />
            <NewGiftBox
              newGiftList={newGiftList}
              storageGiftList={storageGiftList}
            />
          </>
        ) : null}
      </SpaceContainer>
      <ThemeBtnBox>
        <Button onClick={changeThemeHandler}>테마수정</Button>
        <Button onClick={editAvatarHandler}>아바타 수정</Button>
        <Button onClick={editSpaceHandler}>
          {editSpace ? "완료" : "공간 수정"}
        </Button>
      </ThemeBtnBox>
    </>
  );
}
