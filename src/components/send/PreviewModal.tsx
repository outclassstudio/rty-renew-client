import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/reducers";
import { colorSet, fadeAction, fadeExpand } from "../../style/global";

interface Props {
  data: Gift.sendGiftDTO;
  handleCloseModal: () => void;
}

export default function PreviewModal({ data, handleCloseModal }: Props) {
  const itemState = useSelector((state: RootState) => state.getItemReducer);
  const [prvUrl, setPrvUrl] = useState<string>("");

  //프리뷰할 이미지 세팅
  useEffect(() => {
    const url = itemState.img.filter((el) => {
      return el.id === data.imgId;
    });
    if (url[0]) {
      setPrvUrl(url[0].data);
    }
  }, []);

  return (
    <>
      <MainWrapper onClick={handleCloseModal}>
        <PrvBoxWrapper>
          <Text>to. {data.userTo}</Text>
          {prvUrl ? <img src={prvUrl} alt="" /> : ""}
          <Content>
            <ContentImg>
              <div>{data.content}</div>
            </ContentImg>
            <div>from . {data.userFrom}</div>
          </Content>
        </PrvBoxWrapper>
      </MainWrapper>
      <ModalBg />
    </>
  );
}

const ModalBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #30303057;
  animation: 0.2s linear ${fadeAction};
`;

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  padding: 0px;
  cursor: default;
  animation: 0.2s ease-out ${fadeExpand};
`;

const PrvBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  color: ${colorSet.base};
  width: 500px;
  box-shadow: rgba(50, 50, 93, 0.7) 0px 0px 15px 0px;
  padding: 0px;
  border-radius: 11px;
  background-image: url("https://cdn.discordapp.com/attachments/974114424036155505/976382563788673124/pexels-george-dolgikh-giftpunditscom-1303092.jpg");

  img {
    margin-bottom: 5px;
    padding: 0px;
  }
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  background: linear-gradient(to right, #ec047a 30%, #b22490 100%);
  color: white;
  font-size: 17px;
  font-weight: bold;
  padding: 15px 0px;
  border-radius: 10px 10px 0px 0px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
  border-radius: 0px 0px 10px 10px;

  div:nth-child(2) {
    margin-top: 20px;
    font-size: 17px;
    color: #2e2e2e;
  }
`;

const ContentImg = styled.div`
  width: 450px;
  min-height: 130px;
  background-image: url("https://cdn.discordapp.com/attachments/974114424036155505/976274844536676382/letterbg.png");
  background-position: center;
  background-size: cover;
  /* filter: drop-shadow(0px 0px 3px rgba(50, 50, 93, 0.1)); */

  div {
    padding: 27px 25px 10px 34px;
    white-space: pre-wrap;
    word-break: break-all;
    color: #424242;
    line-height: 22px;
    font-family: "Yeon Sung", cursive;
  }
`;
