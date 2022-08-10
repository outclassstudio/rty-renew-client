import { useEffect, useState } from "react";
import styled from "styled-components";
import { NormalBtn } from "../../style/btnStyle.style";
import { fadeAction, fadeExpand } from "../../style/global";

interface Props {
  image: Item.singleItemDTO;
  closeModal: () => void;
  myItem: boolean;
  handleBuyItem: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ImageModal({
  image,
  closeModal,
  myItem,
  handleBuyItem,
}: Props) {
  const [imgUrl, setImgUrl] = useState<string>("");

  //이미지 분류하여 url 상태 세팅
  useEffect(() => {
    if (image.type === "svg") {
      const svgStr = image.data;
      const svg = new Blob([svgStr], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svg);
      setImgUrl(url);
    } else {
      setImgUrl(image.data);
    }
  }, []);

  return (
    <>
      <MainWrapper onClick={closeModal}>
        <img src={imgUrl} alt="" />
        <NameText>{image.name}</NameText>
        {myItem ? (
          ""
        ) : (
          <OverwrapWrapper>
            <NormalBtn
              onClick={(e) => handleBuyItem(e)}
              className="b"
              height={"35px"}
              width={"200px"}
            >
              구입하기
            </NormalBtn>
          </OverwrapWrapper>
        )}
      </MainWrapper>
      <ModalBg></ModalBg>
    </>
  );
}

const MainWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
  animation: 0.2s ease-out ${fadeExpand};

  img {
    width: 500px;
  }
`;

const ModalBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #30303084;
  animation: 0.2s linear ${fadeAction};
`;

const OverwrapWrapper = styled.div`
  /* top: 110px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* position: fixed; */
  border-radius: 10px 10px 0px 0px;
  font-size: 20px;
  gap: 10px;
`;

const OverwrapText = styled.div`
  color: #ffffff;
  border-radius: 10px 10px 0px 0px;
  font-size: 20px;
`;

const NameText = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  color: white;
  font-size: 25px;
  font-weight: bold;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 1);
`;
