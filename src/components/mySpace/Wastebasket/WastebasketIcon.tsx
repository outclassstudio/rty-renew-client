import { ReactComponent as GarbageTrash } from "../../../assets/images/svg/garbageTrash.svg";
import styled from "styled-components";

export const WastebasketIconBox = styled.div`
  width: 100px;
  height: 150px;
  position: fixed;
  /* top: 710px;
  left: 220px; */
  margin-top: 600px;
  margin-left: 20px;
  cursor: pointer;
`;

export function WastebasketIcon() {
  return (
    <WastebasketIconBox>
      <GarbageTrash />
    </WastebasketIconBox>
  );
}
