import styled from "styled-components";
import { baseColor } from "../../style/global";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSvg } from "../../redux/reducers/sendGiftReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";

export default function SetGiftBox() {
  const dispatch = useDispatch();
  const svgState = useSelector(
    (state: RootState) => state.getItemReducer,
    (left, right) => {
      return left.img === right.img;
    }
  );
  const [prvSvg, setPrvSvg] = useState<any>({ id: null, svg: "" });

  //선물포장 선택하는 함수
  const handleSetPrv = (id: number, url: string, source: string): void => {
    setPrvSvg({ id: id, svg: url });
    dispatch(setSvg(id));
  };

  return (
    <MainContainer>
      선물포장을 선택해주세요
      <SvgListWrapper>
        <SvgList>
          {svgState.svg.map((el, idx) => {
            // console.log("호출");
            const svgStr = el.data;
            const svg = new Blob([svgStr], { type: "image/svg+xml" });
            const url = URL.createObjectURL(svg);

            return (
              <SingleSvg
                onClick={() => handleSetPrv(el.idx, url, el.data)}
                className={el.idx === prvSvg.id ? "active" : ""}
                src={url}
                key={idx}
              />
            );
          })}
        </SvgList>
      </SvgListWrapper>
      <SvgPrv>
        {prvSvg.id ? (
          <img src={prvSvg.svg} alt="" />
        ) : (
          <NoneImg>선택된 포장이 없습니다</NoneImg>
        )}
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

const NoneImg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 262px;
  /* padding: 0px; */
  color: ${baseColor};
  font-size: 13px;
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
