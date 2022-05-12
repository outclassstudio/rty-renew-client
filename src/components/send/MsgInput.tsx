import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../redux/reducers";
import { setContent, setImg } from "../../redux/reducers/sendGiftReducer";
import { baseColor } from "../../style/global";

export default function MsgInput() {
  const dispatch = useDispatch();
  const giftState = useSelector((state: RootState) => state.sendGiftReducer);
  const itemState = useSelector((state: RootState) => state.getItemReducer);

  const [imgUrl, setImgUrl] = useState<string>("");
  const [letterNum, setLetterNum] = useState<number>(0);

  //프리뷰이미지 변경 및 상태변경 함수
  const changeImg = (url: string): void => {
    dispatch(setImg(url));
    setImgUrl(url);
  };

  //글자수 세는 함수 및 제한수 초과시 경고
  const calcLetterNum = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setLetterNum(e.target.value.length);
    dispatch(setContent(e.target.value));

    if (e.target.value.length >= 100) {
      alert("더이상 입력할 수 없습니다");
      let str = e.target.value.slice(0, -1);
      e.target.value = str;
    }
  };

  return (
    <MainContainer>
      <SubContainer>
        <Receiver>
          <div>🎁{giftState.gift.nickname}님에게</div>
        </Receiver>
        <ImgListWrapper>
          <div>메시지와 함께 보낼 이미지를 선택해주세요</div>
          <ImgList>
            {itemState.img.map((el, idx) => {
              return (
                <SingleImg
                  onClick={() => changeImg(el.data)}
                  className={el.data === imgUrl ? "active" : ""}
                  src={el.data}
                  key={idx}
                  alt=""
                />
              );
            })}
          </ImgList>
          {imgUrl ? (
            <ImagePrv src={imgUrl} alt="" />
          ) : (
            <NoneImg>선택된 이미지가 없습니다</NoneImg>
          )}
        </ImgListWrapper>
      </SubContainer>
      <SubContainer className="b">
        <BoxWrapper>
          <div>마음을 담은 메시지를 작성해보세요 ({letterNum}/100)</div>
          <MsgInputBox onChange={(e) => calcLetterNum(e)} />
        </BoxWrapper>
      </SubContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* background: #f6f6f6; */
  background: #4c3e9f;
  color: white;
  padding: 25px 35px 30px 35px;
  border-radius: 10px;
  gap: 10px;
  box-shadow: rgba(50, 50, 93, 0.527) 0px 0px 15px 0px;
  /* box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -40px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -50px; */

  &.b {
    background: ${baseColor};
  }
`;

const Receiver = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  /* gap: 10px; */

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
  /* color: #3f3f3f; */
  color: ${baseColor};
  box-shadow: rgba(50, 50, 93, 1) 0px 0px 5px 0px;

  div {
    display: flex;
    /* justify-content: space-between; */
  }

  div span:nth-child(2) {
    /* padding: 5px; */
    background: gray;
  }
`;

const NoneImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 262px;
  /* padding: 0px; */
`;

const TableIcon = styled.img`
  width: 10px;
`;

const ImgList = styled.div`
  display: flex;
  gap: 10px;
  /* background: white; */
`;

const SingleImg = styled.img`
  width: 80px;
  cursor: pointer;
  border-radius: 7px;

  &.active {
    outline: 3px solid ${baseColor};
  }
`;

const ImagePrv = styled.img`
  width: 350px;
  height: 262px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 1) 0px 30px 30px -35px;
`;

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* color: #3f3f3f; */
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
