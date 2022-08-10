import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { RootState } from "../../redux/reducers";
import { setContent, setImg } from "../../redux/reducers/sendGiftReducer";
import { colorSet } from "../../style/global";
import SendItemListCarousel from "./SendItemListCarousel";
import ViewAllItemsModal from "./ViewAllItemsModal";

interface Prvitem {
  id: null | number;
  url: string;
}

export default function MsgInput() {
  const dispatch = useDispatch();

  //스토어에서 상태 호출
  const giftState = useSelector((state: RootState) => state.sendGiftReducer);
  const itemState = useSelector((state: RootState) => state.getItemReducer);

  //각종상태
  const [prvItem, setPrvItem] = useState<Prvitem>({ id: null, url: "" });
  const [letterNum, setLetterNum] = useState<number>(0);
  const [viewAll, setViewAll] = useState<boolean>(false);

  //프리뷰이미지 변경 및 상태변경 함수
  const changeImg = (idx: number, url: string): void => {
    setPrvItem({ id: idx, url: url });
    dispatch(setImg(idx));
  };

  //모든 아이템 보기 모달창 on/off
  const handleActiveViewAll = () => {
    setViewAll((prev) => !prev);
  };

  //글자수 세는 함수 및 제한수 초과시 경고
  const calcLetterNum = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setLetterNum(e.target.value.length);

    if (e.target.value.length > 150) {
      Swal.fire({
        title: "150자 이상 입력할 수 없어요",
        icon: "warning",
        confirmButtonText: "닫기",
      });

      let str = e.target.value.slice(0, 149);
      e.target.value = str;
      setLetterNum(str.length);
    }

    dispatch(setContent(e.target.value));
  };

  //프리뷰 제거 함수
  const removePreview = () => {
    setPrvItem({ id: null, url: "" });
    dispatch(setImg(null));
  };

  return (
    <MainContainer>
      <SubContainer>
        <Receiver>
          <div>
            🎁 {giftState.gift.nickname}
            님에게
          </div>
        </Receiver>
        <ImgListWrapper>
          <TitleWrapper>
            메시지와 함께 보낼 이미지를 선택해주세요
            <img
              src="https://cdn.discordapp.com/attachments/974114424036155505/978082271208800256/menusgrey.png"
              alt=""
              onClick={handleActiveViewAll}
            />
          </TitleWrapper>
          <ImgList>
            <SendItemListCarousel
              handleSetPrv={changeImg}
              prvItem={prvItem}
              data={itemState.img}
            />
          </ImgList>
          {prvItem.url ? (
            <>
              <CancelBtn
                onClick={removePreview}
                src={
                  "https://cdn.discordapp.com/attachments/974114424036155505/978530134460096582/cancel_pink.png"
                }
                alt=""
              />
              <ImagePrv src={prvItem.url} alt="" />
            </>
          ) : (
            <NoneImg>선택된 이미지가 없습니다</NoneImg>
          )}
        </ImgListWrapper>
        {viewAll ? (
          <ViewAllItemsModal
            data={itemState.img}
            handleSetPrv={changeImg}
            prvItem={prvItem}
            handleActiveViewAll={handleActiveViewAll}
          />
        ) : (
          ""
        )}
      </SubContainer>
      <SubContainer className="b">
        <BoxWrapper>
          <div>마음을 담은 메시지를 작성해보세요 ({letterNum}/150)</div>
          <MsgInputBox onChange={(e) => calcLetterNum(e)} />
        </BoxWrapper>
      </SubContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 480px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colorSet.purple};
  color: white;
  padding: 25px 35px 30px 35px;
  border-radius: 10px;
  gap: 10px;
  box-shadow: rgba(50, 50, 93, 0.527) 0px 0px 15px 0px;

  &.b {
    background: ${colorSet.base};
  }
`;

const Receiver = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 17px;
  }
`;

const ImgListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px 30px;
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
    width: 15px;
    height: 15px;
    cursor: pointer;
    padding: 3px;
  }

  img:hover {
    background: ${colorSet.skyBlue};
  }
`;

const ImgList = styled.div`
  display: flex;
  padding: 0px 5px;
`;

const NoneImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 262px;
`;

const ImagePrv = styled.img`
  width: 350px;
  height: 262px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 1) 0px 30px 30px -35px;
`;

const CancelBtn = styled.img`
  margin-top: 110px;
  margin-left: 343px;
  position: fixed;
  width: 14px;
  cursor: pointer;
  opacity: 0.5;

  :hover {
    opacity: 1;
  }
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 14px;
  gap: 5px;
`;

const MsgInputBox = styled.textarea`
  height: 65px;
  border: 1px solid #dbdbdb;
  padding: 15px;

  :focus {
    outline: none;
  }
`;
