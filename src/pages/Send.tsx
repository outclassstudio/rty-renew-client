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
import { useEffect } from "react";
import { getMyItems } from "../apis/buyApi";
import { useDispatch } from "react-redux";
import { setGetImg, setGetSvg } from "../redux/reducers/getItemReducer";

export default function Send() {
  const dispatch = useDispatch();
  const giftState = useSelector((state: RootState) => state.sendGiftReducer);

  //내 아이템 리스트 불러와서 store에 저장
  useEffect(() => {
    getMyItems().then((res) => {
      const imgData = res.data.filter((el) => {
        return el.type === "img";
      });
      const svgData = res.data.filter((el) => {
        return el.type === "svg";
      });

      dispatch(setGetImg(imgData));
      dispatch(setGetSvg(svgData));
    });
  }, []);

  //선물전송함수
  const handleSendGift = (): void => {
    if (giftState.gift.userTo) {
      sendGift(giftState.gift)
        .then(() => {
          console.log("전송성공!");
        })
        .catch((err) => {
          console.log("실패!", err);
        });
    } else {
      alert("보낼사람을 선택해주세요");
    }
  };

  return (
    <Layout title={"선물보내기"}>
      <MainContainer className="main">
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
