import styled from "styled-components";
import { colorSet, fadeAction, fadeExpand } from "../../../style/global";

interface Props {
  item: any;
  id: number | undefined;
  setIsOpenGift: (state: boolean) => void;
}
export default function Gift({ item, id, setIsOpenGift }: Props) {
  const openGiftArr = item.find((el: any) => {
    return el.id === id;
  });
  const openGift = openGiftArr?.gift;
  console.log("이거 콘솔은 찍히니", item, openGift);

  const closeModalHandler = () => {
    setIsOpenGift(false);
  };

  return (
    <>
      <MainWrapper onClick={closeModalHandler}>
        <PrvBoxWrapper>
          <Text>to. {openGift?.userTo}</Text>
          <Img src={openGift?.img} alt="" />
          <Content>
            <ContentImg>
              <div>{openGift?.content}</div>
            </ContentImg>
            <div>from . {openGift?.userFrom}</div>
          </Content>
        </PrvBoxWrapper>
      </MainWrapper>
      <ModalBg />
    </>
  );
}

export const ModalBackground = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
`;

export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 400px;
  padding: 2rem 1rem 2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background-color: #efefef;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @media screen and (max-width: 480px) {
    width: 70%;
  }
`;

export const ImgBox = styled.div`
  width: 300px;
  height: 200px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
`;

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
  z-index: 100;
  padding: 0px;
  border-radius: 11px;
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
