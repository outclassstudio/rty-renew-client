import Layout from "./Layout";
import FindUser from "../components/send/FindUser";
import MsgInput from "../components/send/MsgInput";
import SetGiftBox from "../components/send/SetGiftBox";
import PreviewModal from "../components/send/PreviewModal";
import styled from "styled-components";
import { NormalBtn } from "../style/btnStyle.style";
import { fadeMoveAction, fadeMoveActionDelay } from "../style/global";
import { sendGift } from "../apis/giftApi";
import { useSelector } from "react-redux";
import { RootState } from "../redux/reducers";
import { useEffect, useState } from "react";
import { getMyItems } from "../apis/itemApi";
import { useDispatch } from "react-redux";
import { setGetImg, setGetSvg } from "../redux/reducers/getItemReducer";
import Swal from "sweetalert2";
import Loading from "../components/Loading";
import { useNavigate } from "react-router";
import { clearSendGift } from "../redux/reducers/sendGiftReducer";

export default function Send() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const giftState = useSelector(
    (state: RootState) => state.sendGiftReducer.gift
  );
  const [openPreview, setOpenPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //내 아이템 리스트 불러와서 store에 저장
  useEffect(() => {
    getMyItems().then((res) => {
      setIsLoading(false);
      const imgData = res.data.myItems?.filter((el) => {
        return el.type === "img";
      });
      const svgData = res.data.myItems?.filter((el) => {
        return el.type === "svg";
      });

      if (imgData) {
        dispatch(setGetImg(imgData));
      }
      if (svgData) {
        dispatch(setGetSvg(svgData));
      }
    });
  }, []);

  //에러메시지 띄우기
  const viewErrMsg = (text: string): void => {
    Swal.fire({
      title: text,
      icon: "error",
      confirmButtonText: "닫기",
    });
  };

  //에러유형체크
  const checkSendGift = (): boolean => {
    if (!giftState.userTo) {
      viewErrMsg("유저를 선택해주세요");
      return false;
    } else if (!giftState.svg) {
      viewErrMsg("포장을 선택해주세요");
      return false;
    } else if (!giftState.content) {
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
      sendGift(giftState)
        .then(() => {
          navigate("/giftlist");
          Swal.fire({
            title: "선물이 보내졌습니다",
            text: "👋100포인트가 추가됩니다!",
            icon: "success",
            confirmButtonText: "닫기",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(clearSendGift());
            }
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "에러가 있어요",
            text: `${err.response.data}`,
            icon: "error",
            confirmButtonText: "닫기",
          });
        });
    }
  };

  return (
    <Layout title={"선물보내기"}>
      {isLoading ? (
        <Loading />
      ) : (
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
              data={giftState}
              handleCloseModal={handleCloseModal}
            />
          ) : (
            ""
          )}
        </MainContainer>
      )}
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
  animation: 0.6s ease-in-out ${fadeMoveAction};
`;

const RightWrapper = styled.div`
  animation: 0.7s ease-out ${fadeMoveActionDelay};
`;

const BtnWrapper = styled.div`
  animation: 0.8s ease-out ${fadeMoveActionDelay};
  display: flex;
  gap: 10px;
`;
