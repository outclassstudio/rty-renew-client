import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getMyGift } from "../../../apis/giftApi";
import { ReactComponent as StorageICon } from "../../../assets/images/svg/storage.svg";
import {
  setClickGiftBox,
  setOpenGiftBox,
  setIsOpenSave,
  setStorageGift,
} from "../../../redux/reducers/spaceReducer";
import openBox from "../../../assets/images/openBox.png";
import closeBox from "../../../assets/images/closeBox.png";

export function Storage(props: any) {
  const dispatch = useDispatch();
  const isEditSpace = props.isEditSpace;
  //storage clcick -> stroagebox 열기

  const [isHover, setIsHover] = useState(false);
  const [isShowStorage, setIsShowStorage] = useState<Boolean>(false);
  //get Item status가 storage인것만 가져오기
  useEffect(() => {}, [isShowStorage, isHover]);

  const isOpenGiftBox = useSelector(
    (state: any) => state.spaceReducer.isOpenGiftBox
  );

  const isOpenTrash = useSelector(
    (state: any) => state.spaceReducer.isOpenTrash
  );

  const isOpenSave = useSelector((state: any) => state.spaceReducer.isOpenSave);

  const isOpenHandler = () => {
    getMyGift().then((res) => {
      const storge = res.data.filter((el) => el.status === "storage");
      dispatch(setStorageGift(storge));
    });
    dispatch(setOpenGiftBox(!isOpenGiftBox));
    dispatch(setClickGiftBox("storage"));
  };

  const isShowHandler = () => {
    setIsShowStorage(!isShowStorage);
  };

  const clickBoxHandler = () => {
    dispatch(setIsOpenSave(!isOpenSave));
  };

  return (
    <>
      {isEditSpace ? (
        <>
          {isOpenTrash ? null : (
            <>
              <StorageContainer
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
              >
                <HoverBox className={isHover ? "mouseHover" : ""}>
                  {isHover ? (
                    <ToolTipText>
                      (저장 박스)
                      <p>상자를 클릭 후 저장할 아이템을 선택해주세요.</p>
                    </ToolTipText>
                  ) : null}
                </HoverBox>
                {isOpenSave ? (
                  <ImgBox onClick={clickBoxHandler}>
                    <Img src={openBox} alt="OpenBox" />
                  </ImgBox>
                ) : (
                  <ImgBox onClick={clickBoxHandler}>
                    <Img src={closeBox} alt="closeBox" />
                  </ImgBox>
                )}
              </StorageContainer>
            </>
          )}
        </>
      ) : (
        <StorageContainer
          onClick={isShowHandler}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <HoverBox className={isHover ? "mouseHover" : ""}>
            {isHover ? (
              <ToolTipText1>
                (스토리지함)
                <p>버튼을 클릭 후 스토리지함을 열어보세요.</p>
              </ToolTipText1>
            ) : null}
          </HoverBox>
          {isShowStorage ? (
            <ShowBox>
              <Minus
                src={
                  "https://cdn.discordapp.com/attachments/974114424036155505/978184305668923402/minus.png"
                }
              />
            </ShowBox>
          ) : (
            <ShowBox>
              <Plus
                src={
                  "https://cdn.discordapp.com/attachments/974114424036155505/978184305916403762/plus.png"
                }
              />
            </ShowBox>
          )}
          {isShowStorage ? (
            <StorageICon fill="#f13838" onClick={isOpenHandler} />
          ) : null}
        </StorageContainer>
      )}
    </>
  );
}

const Minus = styled.img`
  width: 20px;
`;

const Plus = styled.img`
  width: 20px;
`;

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
  bottom: "90%",
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

const ToolTipText1 = styled("span")({
  width: "180px",
  backgroundColor: "#92B4EC",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",
  padding: "10px",
  position: "absolute",
  zIndex: 1,
  bottom: "120%",
  left: "-2%",
  marginLeft: "-60px",
  border: "5px solid #194470",

  ":after": {
    content: '""',
    position: "absolute",
    top: "102%",
    left: "32%",
    marginLeft: "-5px",
    borderWidth: "15px",
    borderStyle: "solid",
    borderColor: "#194470 transparent transparent transparent",
  },
});

export const StorageContainer = styled.div`
  position: fixed;
  margin-top: 115px;
  margin-left: 1165px;
  cursor: pointer;
  user-select: none;
  z-index: 1;
`;

export const ShowBox = styled.div``;

export const HoverBox = styled.div``;

export const ImgBox = styled.div`
  width: 75px;
  height: 75px;
  margin-top: 20px;
`;

export const Img = styled.img`
  width: 100%;
`;
