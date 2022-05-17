import styled from "styled-components";
import { ReactComponent as StorageICon } from "../../../assets/images/svg/storage.svg";

export const StorageContainer = styled.div`
  width: 100px;
  height: 150px;
  position: fixed;
  top: 700px;
  left: 1550px;
`;

export function Storage() {
  return (
    <StorageContainer>
      <StorageICon />
    </StorageContainer>
  );
}
