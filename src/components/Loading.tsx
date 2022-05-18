import styled from "styled-components";
import { colorSet } from "../style/global";

export default function Loading() {
  return (
    <LoadingWrapper>
      {/* <div>로딩중...</div> */}
      <img
        src={
          "https://cdn.discordapp.com/attachments/974114424036155505/976337872934297650/Spinner-1s-200px.gif"
        }
        alt=""
      />
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff65;
  z-index: 2;

  div {
    position: fixed;
    font-weight: bold;
    font-size: 13px;
    color: ${colorSet.base};
  }

  img {
    width: 170px;
  }
`;
