import { ReactComponent as GarbageTrash } from "../../../assets/images/svg/trashClose.svg";
import { ReactComponent as TrashOpen } from "../../../assets/images/svg/trashOpen.svg";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setIsOpenTrash } from "../../../redux/reducers/spaceReducer";

export const WastebasketIconBox = styled.div`
  width: 100px;
  height: 150px;
  position: fixed;
  margin-top: 600px;
  margin-left: 20px;
  cursor: pointer;
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
          {isOpenTrash ? <TrashOpen /> : <GarbageTrash />}
        </WastebasketIconBox>
      )}
    </>
  );
}
