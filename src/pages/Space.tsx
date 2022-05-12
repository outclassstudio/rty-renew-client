import styled from "styled-components";
import { useEffect, useState } from "react";
import { getUserInfo } from "../apis/userApi";
import NewGift from "../components/mySpace/NewGift/NewGiftIcon";
import Canvas from "../components/mySpace/Canvas";
import { NewGiftBox } from "../components/mySpace/NewGift/NewGiftBox";
import Layout from "./Layout";
import { Avatar } from "../components/mySpace/Avatar";
import { isThemeModal, userInfo } from "../redux/actions/index";
import { useDispatch } from "react-redux";

export const SpaceContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  useEffect(() => {
    console.log("fiursr");
    // axios.get("엔드포인트", {헤더}, {바디}).then(....)
    getUserInfo().then((res) => {
      let user = res.data;
      setMyInfo(user);
      userInfo(user);
    });
  }, []);
  console.log("myInfo", myInfo);
  //change Theme
  const changeThemeHandler = () => {
    dispatch(isThemeModal(true));
  };
  return (
    <Layout>
      <SpaceContainer>
        <NewGift />
        <Avatar />
        <Canvas />
        <NewGiftBox />
        <ThemeBtnBox>
          <button onClick={changeThemeHandler}>테마수정</button>
          <button>아바타 수정</button>
          <button>공간 수정</button>
        </ThemeBtnBox>
      </SpaceContainer>
    </Layout>
  );
}
