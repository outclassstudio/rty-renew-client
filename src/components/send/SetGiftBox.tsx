import styled from "styled-components";
import { baseColor } from "../../style/global";
import { useState } from "react";
import { svgArr } from "./dummy";
import { useDispatch } from "react-redux";
import { setSvg } from "../../redux/reducers/sendGiftReducer";

export default function SetGiftBox() {
  const dispatch = useDispatch();
  const [prvSvg, setPrvSvg] = useState<any>(svgArr[0].svg);

  //선물포장 선택하는 함수
  const handleSetPrv = (comp: string): void => {
    setPrvSvg(comp);
    dispatch(setSvg(comp));
  };

  return (
    <MainContainer>
      선물포장을 선택해주세요
      <SvgListWrapper>
        <SvgList>
          {svgArr.map((el, idx) => {
            return (
              <SingleSvg
                onClick={() => handleSetPrv(el.svg)}
                className={el.svg === prvSvg ? "active" : ""}
                src={el.svg}
                key={idx}
              />
            );
          })}
        </SvgList>
      </SvgListWrapper>
      <SvgPrv>
        <img src={prvSvg} alt="" />
      </SvgPrv>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 410px;
  height: 508px;
  display: flex;
  flex-direction: column;
  /* background: #f6f6f6; */
  background: #4c3e9f;
  color: white;
  padding: 25px 35px 30px 35px;
  border-radius: 10px;
  gap: 15px;
  box-shadow: rgba(50, 50, 93, 0.527) 0px 0px 15px 0px;
`;

const SvgListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 20px 30px;
  gap: 15px;
  font-size: 13px;
  /* color: #3f3f3f; */
  color: ${baseColor};
  box-shadow: rgba(50, 50, 93, 1) 0px 0px 5px 0px;
`;

const SvgList = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  /* background: white; */

  div {
    display: flex;
  }

  img {
  }
`;

const SingleSvg = styled.img`
  width: 80px;
  cursor: pointer;
  border-radius: 7px;

  &.active {
    outline: 3px solid ${baseColor};
  }
`;

const SvgPrv = styled.div`
  display: flex;
  background: white;
  /* width: 350px; */
  height: 290px;
  padding: 20px;
  /* border-radius: 10px; */
  /* box-shadow: rgba(0, 0, 0, 1) 0px 30px 30px -35px; */
  box-shadow: rgba(50, 50, 93, 1) 0px 0px 5px 0px;
`;
