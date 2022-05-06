import styled from "styled-components";

import Canvas from "../components/mySpace/Canvas";

export const SpaceContainer = styled.div``;

export default function Space() {
  return (
    <SpaceContainer>
      <Canvas />
    </SpaceContainer>
  );
}
