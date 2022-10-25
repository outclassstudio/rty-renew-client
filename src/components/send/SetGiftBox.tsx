import styled from "styled-components";
import { colorSet } from "../../style/global";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSvg } from "../../redux/reducers/sendGiftReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import SendItemListCarousel from "./SendItemListCarousel";
import ViewAllItemsModal from "./ViewAllItemsModal";
import { BASE_URL } from "../../constants";

interface PrvSvg {
  id: null | number;
  svg: string;
}

export default function SetGiftBox() {
  const dispatch = useDispatch();
  const svgState = useSelector((state: RootState) => state.getItemReducer);
  const [prvSvg, setPrvSvg] = useState<PrvSvg>({ id: null, svg: "" });
  const [viewAll, setViewAll] = useState<boolean>(false);

  //선물포장 선택하는 함수
  const handleSetPrv = (id: number, url: string): void => {
    setPrvSvg({ id: id, svg: url });
    dispatch(setSvg(id));
  };

  //모든 아이템 보기 모달창 on/off
  const handleActiveViewAll = () => {
    setViewAll((prev) => !prev);
  };

  //프리뷰 제거 함수
  const removePreview = () => {
    setPrvSvg({ id: null, svg: "" });
    dispatch(setSvg(null));
  };

  return (
    <MainContainer>
      <TitleWrapper>
        선물포장을 선택해주세요
        <img
          src="https://cdn.discordapp.com/attachments/974114424036155505/978082257766080582/menuswhite.png"
          alt=""
          onClick={handleActiveViewAll}
        />
      </TitleWrapper>
      <SvgListWrapper>
        <SvgList>
          <SendItemListCarousel
            handleSetPrv={handleSetPrv}
            prvItem={prvSvg}
            data={svgState.svg}
          />
        </SvgList>
      </SvgListWrapper>
      <SvgPrv>
        {prvSvg.id ? (
          <>
            <CancelBtn
              onClick={removePreview}
              src={
                "https://cdn.discordapp.com/attachments/974114424036155505/978530134460096582/cancel_pink.png"
              }
              alt=""
            />
            <img src={`${BASE_URL}${prvSvg.svg}`} alt="" />
          </>
        ) : (
          <NoneImg>선택된 포장이 없습니다</NoneImg>
        )}
      </SvgPrv>
      {viewAll ? (
        <ViewAllItemsModal
          data={svgState.svg}
          handleSetPrv={handleSetPrv}
          prvItem={prvSvg}
          handleActiveViewAll={handleActiveViewAll}
        />
      ) : (
        ""
      )}
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 410px;
  height: 457px;
  display: flex;
  flex-direction: column;
  background: ${colorSet.purple};
  color: white;
  padding: 25px 35px 30px 35px;
  border-radius: 10px;
  gap: 18px;
  box-shadow: rgba(50, 50, 93, 0.527) 0px 0px 15px 0px;
`;

const SvgListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 15px 27px;
  gap: 15px;
  font-size: 13px;
  color: ${colorSet.base};
  box-shadow: rgba(50, 50, 93, 1) 0px 0px 5px 0px;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 101%;

  img {
    margin-top: 2px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    padding: 3px;
  }

  img:hover {
    background: #ffffff37;
  }
`;

const NoneImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 262px;
  color: ${colorSet.base};
  font-size: 13px;
`;

const SvgList = styled.div`
  display: flex;
  padding: 0px 5px;
`;

const SvgPrv = styled.div`
  display: flex;
  background: white;
  height: 250px;
  padding: 20px;
  box-shadow: rgba(50, 50, 93, 1) 0px 0px 5px 0px;
`;

const CancelBtn = styled.img`
  margin-top: 0px;
  margin-left: 340px;
  position: fixed;
  width: 14px;
  cursor: pointer;
  opacity: 0.5;

  :hover {
    opacity: 1;
  }
`;
