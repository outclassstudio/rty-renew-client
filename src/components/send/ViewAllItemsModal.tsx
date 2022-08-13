import styled from "styled-components";
import { NormalBtn } from "../../style/btnStyle.style";
import { colorSet, fadeAction, fadeExpand } from "../../style/global";

interface Props {
  data: getSingleItem[];
  handleSetPrv: (idx: number, url: string) => void;
  prvItem: { id: null | number; url?: string; svg?: string };
  handleActiveViewAll: () => void;
}

interface getSingleItem {
  id: number;
  type: string;
  data: string;
  point?: number;
}

export default function ViewAllItemsModal({
  data,
  handleSetPrv,
  prvItem,
  handleActiveViewAll,
}: Props) {
  //아이템 선택과 동시에 preview업데이트, 모달창 종료
  const handleSetItem = (id: number, url: string) => {
    handleSetPrv(id, url);
    handleActiveViewAll();
  };

  //아이템 컴포넌트
  const renderItems = () => {
    return data.map((el: any, id: number) => {
      // let url: string;
      // if (el.type === "svg") {
      //   const svgStr = el.data;
      //   const svg = new Blob([svgStr], { type: "image/svg+xml" });
      //   url = URL.createObjectURL(svg);
      // } else {
      //   url = el.data;
      // }
      let url = el.data;

      return (
        <ImageWrapper key={id}>
          <SingleItem
            onClick={() => handleSetItem(el.id, url)}
            className={el.id === prvItem.id ? "active" : ""}
            src={url}
          />
        </ImageWrapper>
      );
    });
  };

  return (
    <MainWrapper>
      <PrvBoxWrapper>
        🌈모든 아이템 보기
        <GridBox>{renderItems()}</GridBox>
        <NormalBtn
          onClick={handleActiveViewAll}
          className="b"
          width={"150px"}
          height={"35px"}
        >
          닫기
        </NormalBtn>
      </PrvBoxWrapper>
      <ModalBg onClick={handleActiveViewAll}></ModalBg>
    </MainWrapper>
  );
}

export const ModalBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #3030306a;
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
  padding: 0px;
  cursor: default;
  z-index: 1;
`;

const PrvBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 150px;
  background: ${colorSet.purple};
  color: white;
  width: 500px;
  box-shadow: rgba(50, 50, 93, 0.7) 0px 0px 15px 0px;
  padding: 25px 15px;
  border-radius: 11px;
  gap: 20px;
  font-weight: bold;
  font-size: 20px;
  z-index: 2;
  animation: 0.2s ease-out ${fadeExpand};

  img {
    margin-bottom: 5px;
    padding: 0px;
  }
`;

const GridBox = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  padding: 5px 5px;
  display: flex;
  justify-content: center;
`;

const SingleItem = styled.img`
  width: 100px;
  cursor: pointer;
  border-radius: 7px;

  &.active {
    outline: 3px solid ${colorSet.pink};
  }
`;
