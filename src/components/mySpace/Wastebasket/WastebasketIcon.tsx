import { ReactComponent as GarbageTrash } from "../../../assets/images/svg/trashClose.svg";
import { ReactComponent as TrashOpen } from "../../../assets/images/svg/trashOpen.svg";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setIsOpenTrash } from "../../../redux/reducers/spaceReducer";
import { ToolTip } from "../../ToolTip";

const ToolTipText = styled("span")({
  width: "240px",
  height: "80px",
  backgroundColor: "blue",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",
  padding: "10px",
  position: "absolute",
  zIndex: 1,
  bottom: "100%",
  left: "-20%",
  marginLeft: "-60px",

  ":after": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: "-5px",
    borderWidth: "5px",
    borderStyle: "solid",
    borderColor: "blue transparent transparent transparent",
  },
});

export const WastebasketIconBox = styled.div`
  width: 150px;
  height: 150px;
  position: fixed;
  margin-top: 205px;
  margin-left: 1170px;
  z-index: 2;
  cursor: pointer;
`;

export const HoverBox = styled.div``;

export function WastebasketIcon() {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);

  const isOpenTrash = useSelector(
    (state: any) => state.spaceReducer.isOpenTrash
  );

  const isOpenSave = useSelector((state: any) => state.spaceReducer.isOpenSave);

  useEffect(() => {
    console.log("isHover", isHover);
  }, [isHover]);

  const clickTrashHandler = () => {
    dispatch(setIsOpenTrash(!isOpenTrash));
  };

  return (
    <>
      {isOpenSave ? null : (
        <>
          <WastebasketIconBox
            onClick={clickTrashHandler}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <HoverBox className={isHover ? "mouseHover" : ""}>
              {isHover ? (
                <ToolTipText>
                  (쓰레기통)
                  <p>쓰레기통을 클릭 후 삭제할 아이템을 선택해주세요.</p>
                </ToolTipText>
              ) : null}
            </HoverBox>
            {isOpenTrash ? (
              <TrashOpen width="75" />
            ) : (
              <GarbageTrash width="80" />
            )}
          </WastebasketIconBox>
        </>
      )}
    </>
  );
}
