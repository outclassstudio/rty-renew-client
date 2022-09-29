import styled from "styled-components";
import { useState } from "react";
import Canvas from "../components/mySpace/Canvas";
import Layout from "./Layout";
import { NewGiftBox } from "../components/mySpace/newGift/NewGiftBox";
import { Avatar } from "../components/mySpace/Avatar";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../redux/reducers/spaceReducer";
import { fadeAction } from "../style/global";
import { NormalBtn } from "../style/btnStyle.style";

export default function Space() {
  const dispatch = useDispatch();
  const [editAvatar, setEditAvatar] = useState(false);
  const [canEditSpace, setCanEditSpace] = useState(false);

  const changeThemeHandler = () => {
    dispatch(setModalOpen(true));
  };

  const editAvatarHandler = () => {
    setEditAvatar(!editAvatar);
  };

  const saveSpaceHandler = () => {
    setCanEditSpace((prev) => !prev);
  };

  return (
    <Layout title={"내 공간"}>
      <MainContainer>
        <SpaceContainer>
          <AvatarWrapper>
            <Avatar editAvatar={editAvatar} setEditAvatar={setEditAvatar} />
          </AvatarWrapper>
          <CanvasContainer>
            <Canvas canEditSpace={canEditSpace} />
            <NewGiftBox />
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
              {canEditSpace ? (
                <SpaceBtn className="b" onClick={saveSpaceHandler}>
                  완료
                </SpaceBtn>
              ) : (
                <SpaceBtn className="c" onClick={saveSpaceHandler}>
                  나의 공간 수정
                </SpaceBtn>
              )}
            </ThemeBtnBox>
          </CanvasContainer>
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
