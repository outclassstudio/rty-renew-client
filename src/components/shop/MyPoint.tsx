import styled from "styled-components";
import { colorSet, fadeAction } from "../../style/global";

export default function MyPoint({ myData }: any) {
  return (
    <PointWrapper>
      💡{myData.nickname}님의 포인트 : {myData.point} Point
    </PointWrapper>
  );
}

const PointWrapper = styled.div`
  box-shadow: rgba(50, 50, 93, 0.3) 0px 0px 15px 0px;
  background: ${colorSet.purple};
  border-radius: 10px;
  padding: 22px 30px;
  color: white;
  animation: 0.6s ease-in-out ${fadeAction};
  font-size: 17px;
`;
