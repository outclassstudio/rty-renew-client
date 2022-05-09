import styled from "styled-components";
import { useEffect } from "react";
//import axios from "axios";
import NewGift from "../components/mySpace/NewGift/NewGiftIcon";
import Canvas from "../components/mySpace/Canvas";
import { NewGiftBox } from "../components/mySpace/NewGift/NewGiftBox";
import Layout from "./Layout";

export const SpaceContainer = styled.div`
  display: flex;
`;

export default function Space() {
  useEffect(() => {
    // axios.get("엔드포인트", {헤더}, {바디}).then(....)
  }, []);

  return (
    <Layout>
      <SpaceContainer>
        <NewGift />
        <Canvas />
        <NewGiftBox />
      </SpaceContainer>
    </Layout>
  );
}
