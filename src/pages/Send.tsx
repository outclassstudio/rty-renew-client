import Layout from "./Layout";
import FindUser from "../components/send/FindUser";
import MsgInput from "../components/send/MsgInput";
import SetGiftBox from "../components/send/SetGiftBox";
import styled from "styled-components";
import { NormalBtn } from "../style/btnStyle.style";
import { fadeMoveAction, fadeMoveAction2 } from "../style/global";
import { sendGift } from "../apis/giftApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";

export default function Send() {
  const giftState = useSelector((state: RootState) => state.sendGiftReducer);

  const handleSendGift = (): void => {
    sendGift(giftState.gift)
      .then(() => {
        console.log("전송성공!");
      })
      .catch((err) => {
        console.log("실패!", err);
      });
  };

  return (
    <Layout title={"선물보내기"}>
      <MainContainer>
        <SubContainer>
          <LeftWrapper>
            <FindUser />
            <SetGiftBox />
          </LeftWrapper>
          <RightWrapper>
            <MsgInput />
          </RightWrapper>
        </SubContainer>
        <BtnWrapper>
          <NormalBtn
            onClick={handleSendGift}
            className="b"
            width="300px"
            height="45px"
          >
            선물보내기
          </NormalBtn>
        </BtnWrapper>
      </MainContainer>
    </Layout>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
  gap: 30px;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  animation: 0.7s ease-in-out ${fadeMoveAction};
`;

const RightWrapper = styled.div`
  animation: 1s ease-out ${fadeMoveAction2};
`;

const BtnWrapper = styled.div`
  animation: 1.4s ease-out ${fadeMoveAction2};
`;
