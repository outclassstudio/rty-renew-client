import { ReactComponent as GarbageTrash } from "../../../assets/images/svg/trashClose.svg";
import { ReactComponent as TrashOpen } from "../../../assets/images/svg/trashOpen.svg";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setIsOpenTrash } from "../../../redux/reducers/spaceReducer";
import { ToolTip } from "../../ToolTip";

export const WastebasketIconBox = styled.div`
  width: 150px;
  height: 150px;
  position: fixed;
  margin-top: 205px;
  margin-left: 1170px;
  z-index: 1;
  cursor: pointer;
  & :hover {
    background-color: yellow;
  }
`;

export function WastebasketIcon() {
  const dispatch = useDispatch();
  // const [isOpenTrash, setIsOpenTrash] = useState(false);
  const isOpenTrash = useSelector(
    (state: any) => state.spaceReducer.isOpenTrash
  );

  const isOpenSave = useSelector((state: any) => state.spaceReducer.isOpenSave);

  const clickTrashHandler = () => {
    dispatch(setIsOpenTrash(!isOpenTrash));
  };

  return (
    <>
      {isOpenSave ? null : (
        <WastebasketIconBox onClick={clickTrashHandler}>
          <ToolTip>
            {isOpenTrash ? (
              <TrashOpen width="75" />
            ) : (
              <GarbageTrash width="80" />
            )}
          </ToolTip>
        </WastebasketIconBox>
      )}
    </>
  );
}
