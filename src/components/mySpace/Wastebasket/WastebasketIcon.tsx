import { ReactComponent as GarbageTrash } from "../../../assets/images/svg/garbageTrash.svg";
import styled from "styled-components";

export const WastebasketIconBox = styled.div`
  width: 100px;
  height: 150px;
  position: absolute;
  top: 650px;
  right: 1400px;
`;

export function WastebasketIcon() {
  return (
    <WastebasketIconBox>
      <h3>쓰레기통</h3>
      <GarbageTrash />
    </WastebasketIconBox>
  );
}
