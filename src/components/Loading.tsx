import styled from "styled-components";
import { colorSet } from "../style/global";

export default function Loading() {
  return (
    <LoadingWrapper>
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
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("https://cdn.discordapp.com/attachments/974114424036155505/976719965279363142/background7.png");
  background-position: center;
  background-size: cover;

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
