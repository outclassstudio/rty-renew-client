import styled from "styled-components";
import { useEffect, useState } from "react";
import { getUserInfo } from "../apis/userApi";
import { WastebasketIcon } from "../components/mySpace/Wastebasket/WastebasketIcon";
import NewGift from "../components/mySpace/NewGift/NewGiftIcon";
import Canvas from "../components/mySpace/Canvas";
import { NewGiftBox } from "../components/mySpace/NewGift/NewGiftBox";
import Layout from "./Layout";
import { Avatar } from "../components/mySpace/Avatar";
import { useDispatch } from "react-redux";
import { setModalOpen, setMyGift } from "../redux/reducers/spaceReducer";
import { getGift } from "../apis/giftApi";
import { userInfo } from "../redux/actions";

export const SpaceContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
`;
export const ThemeBtnBox = styled.div``;

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
  const [myInfo, setMyInfo] = useState<any>();
  const [newGiftList, setNewGiftList] = useState<any>();
  const [spaceGiftList, setSpaceGiftList] = useState<any>();
  const [editAvatar, setEditAvatar] = useState(false);
  const [editSpace, setEditSpace] = useState(false);
  useEffect(() => {
    getUserInfo().then((res) => {
      let user = res.data;
      setMyInfo(user);
      dispatch(userInfo(user));
    });

    getGift().then((res) => {
      let gift = res.data;
      const newGift = gift.filter((item) => item.status === "new");
      const space = gift.filter((item) => item.status === "space");
      console.log(newGift, ":setNewGiftList");
      setNewGiftList(newGift);
      setSpaceGiftList(space);
      dispatch(setMyGift(gift));
      console.log(gift, "gifttt");
    });
  }, []);

  console.log("new", newGiftList, "space", spaceGiftList, "myInfo", myInfo);
  //change Theme
  const changeThemeHandler = () => {
    dispatch(setModalOpen(true));
  };

  const editHandler = () => {
    setEditAvatar(!editAvatar);
  };

  const editSpaceHandler = () => {
    //editSpace 가  true일 때만
    //canvas에 붙은 svg 값을 보낸다.
    setEditSpace(!editSpace);
  };
  return (
    <Layout>
      <SpaceContainer>
        <NewGift />
        <Avatar
          editAvatar={editAvatar}
          setEditAvatar={setEditAvatar}
          myInfo={myInfo}
        />
        <Canvas giftList={spaceGiftList} editSpace={editSpace} />
        <NewGiftBox giftList={newGiftList} />

        <ThemeBtnBox>
          <button onClick={changeThemeHandler}>테마수정</button>
          <button onClick={editHandler}>아바타 수정</button>
          <button onClick={editSpaceHandler}>
            {editSpace ? "완료" : "공간 수정"}
          </button>
        </ThemeBtnBox>
      </SpaceContainer>
    </Layout>
  );
}
