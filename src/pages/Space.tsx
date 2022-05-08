import styled from "styled-components";

import { useEffect } from "react";
import { getGift } from "../apis/giftApi";
//import axios from "axios";

import Canvas from "../components/mySpace/Canvas";

export const SpaceContainer = styled.div``;

export default function Space() {
  useEffect(() => {
    // axios.get("엔드포인트", {헤더}, {바디}).then(....)
    getGift().then();
  }, []);

  return (
    <SpaceContainer>
      <Canvas />
    </SpaceContainer>
  );
}
