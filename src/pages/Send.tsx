import Layout from "./Layout";
import FindUser from "../components/send/FindUser";
import MsgInput from "../components/send/MsgInput";
import SetGiftBox from "../components/send/SetGiftBox";
import PreviewModal from "../components/send/PreviewModal";
import styled from "styled-components";
import { NormalBtn } from "../style/btnStyle.style";
import { fadeMoveAction, fadeMoveAction2 } from "../style/global";
import { sendGift } from "../apis/giftApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { useEffect, useState } from "react";
import { getMyItems } from "../apis/buyApi";
import { useDispatch } from "react-redux";
import { setGetImg, setGetSvg } from "../redux/reducers/getItemReducer";
import Swal from "sweetalert2";

export default function Send() {
  const dispatch = useDispatch();
  const giftState = useSelector((state: RootState) => state.sendGiftReducer);
  const [openPreview, setOpenPreview] = useState<boolean>(false);

  //내 아이템 리스트 불러와서 store에 저장
  useEffect(() => {
    getMyItems().then((res) => {
      const imgData = res.data.filter((el) => {
        return el.type === "img";
      });
      const svgData = res.data.filter((el) => {
        return el.type === "svg";
      });

      dispatch(setGetImg(imgData));
      dispatch(setGetSvg(svgData));
    });
  }, []);

  //에러메시지 띄우기
  const viewErrMsg = (text: string): void => {
    Swal.fire({
      title: text,
      // text: text,
      icon: "error",
      confirmButtonText: "닫기",
    });
  };

  //에러유형체크
  const checkSendGift = (): boolean => {
    if (!giftState.gift.userTo) {
      viewErrMsg("유저를 선택해주세요");
      return false;
    } else if (!giftState.gift.svg) {
      viewErrMsg("포장을 선택해주세요");
      return false;
    } else if (!giftState.gift.content) {
      viewErrMsg("내용을 입력해주세요");
      return false;
    } else {
      return true;
    }
  };

  //미리보기 열기
  const handleOpenPreview = () => {
    if (checkSendGift()) {
      setOpenPreview(true);
    }
  };

  //미리보기 닫기
  const handleCloseModal = () => {
    setOpenPreview(false);
  };

  //선물전송함수
  const handleSendGift = (): void => {
    if (checkSendGift()) {
      sendGift(giftState.gift)
        .then(() => {
          Swal.fire({
            title: "선물이 보내졌습니다",
            icon: "success",
            confirmButtonText: "닫기",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.replace("/giftlist");
            }
          });
        })
        .catch((err) => {
          console.log("실패!", err);
        });
    }
  };

  return (
    <Layout title={"선물보내기"}>
      <MainContainer className="main">
        <SubContainer>
          <LeftWrapper>
            <FindUser />
            <SetGiftBox />
          </LeftWrapper>
          <RightWrapper>
            <MsgInput />
          </RightWrapper>
        </SubContainer>
        <BtnWrapper>
          <NormalBtn
            onClick={handleOpenPreview}
            className="c"
            width="200px"
            height="45px"
          >
            미리보기
          </NormalBtn>
          <NormalBtn
            onClick={handleSendGift}
            className="b"
            width="200px"
            height="45px"
          >
            선물보내기
          </NormalBtn>
        </BtnWrapper>
        {openPreview ? (
          <PreviewModal
            data={giftState.gift}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          ""
        )}
      </MainContainer>
    </Layout>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 50px);
  gap: 30px;
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  animation: 0.7s ease-in-out ${fadeMoveAction};
`;

const RightWrapper = styled.div`
  animation: 1s ease-out ${fadeMoveAction2};
`;

const BtnWrapper = styled.div`
  animation: 1.4s ease-out ${fadeMoveAction2};
  display: flex;
  gap: 10px;
`;
