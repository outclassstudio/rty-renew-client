import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { setIsOpenTrash } from "../../../redux/reducers/spaceReducer";
import closeTrash from "../../../assets/images/trashClose.png";
import openTrash from "../../../assets/images/trashOpen.png";
import { Img, ImgBox } from "../storage/Storage";

export function WastebasketIcon() {
  const dispatch = useDispatch();
  const [isHover, setIsHover] = useState(false);

  const isOpenTrash = useSelector(
    (state: any) => state.spaceReducer.isOpenTrash
  );

  const isOpenSave = useSelector((state: any) => state.spaceReducer.isOpenSave);

  useEffect(() => {}, [isHover]);

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
              <ImgBox>
                <Img src={openTrash} alt="openTrash" title="(쓰레기통)" />
              </ImgBox>
            ) : (
              <ImgBox>
                <Img src={closeTrash} alt="closeTrash" />
              </ImgBox>
            )}
          </WastebasketIconBox>
        </>
      )}
    </>
  );
}

const ToolTipText = styled("span")({
  width: "240px",
  height: "80px",
  backgroundColor: "#92B4EC",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",
  padding: "10px",
  position: "absolute",
  zIndex: 1,
  bottom: "100%",
  left: "-46%",
  marginLeft: "-60px",
  border: "5px solid #194470",
  ":after": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "45%",
    marginLeft: "-5px",
    borderWidth: "15px",
    borderStyle: "solid",
    borderColor: "#194470 transparent transparent transparent",
  },
});

export const WastebasketIconBox = styled.div`
  position: fixed;
  margin-top: 210px;
  margin-left: 1164px;
  z-index: 2;
  cursor: pointer;
`;

export const HoverBox = styled.div``;
