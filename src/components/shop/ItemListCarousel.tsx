import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import styled from "styled-components";
import { baseColor } from "../../style/global";
import { useState } from "react";
import ImageModal from "./ImageModal";
import { buyItem } from "../../apis/buyApi";
import Swal from "sweetalert2";

export default function ItemListCarousel({ img, myIdList, myData }: any) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [current, setCurrent] = useState<any>({});
  const [myItem, setMyItem] = useState<boolean>(false);

  //carousel 세팅
  const settings = {
    focusOnSelect: true,
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrow: true,
  };

  //모달 열기 및 선택된 아이템 상태 업데이트
  const openModal = (item: any) => {
    setCurrent(item);

    if (myIdList.includes(item.idx)) {
      setMyItem(true);
    } else {
      setMyItem(false);
    }

    setModalOpen(true);
  };

  //모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  //모달 띄우고 아이템 구입 요청
  const handleBuyItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    let data = {
      userId: window.localStorage.getItem("id"),
      itemIdx: current.idx,
      point: current.point,
      name: current.name,
    };

    if (myData.point < data.point) {
      Swal.fire({
        title: "포인트가 부족해요!",
        icon: "error",
        confirmButtonText: "네ㅠㅠ",
      });
    } else {
      //*확인 클릭시 구매요청 진행
      Swal.fire({
        title: `${current.point}포인트가 차감됩니다. 그래도 하시겠습니까?`,
        icon: "info",
        confirmButtonText: "네!",
        showCancelButton: true,
        cancelButtonText: "안할래요",
      }).then((result) => {
        if (result.isConfirmed) {
          buyItem(data).then(() => {
            window.location.replace("/shop");
          });
        }
      });
    }
  };

  //모달 안 띄우고 아이템 구입 요청
  const handleDirectBuy = (item: any) => {
    if (myIdList.includes(item.idx)) {
      return;
    } else {
      if (myData.point < item.point) {
        Swal.fire({
          title: "포인트가 부족해요!",
          icon: "error",
          confirmButtonText: "네ㅠㅠ",
        });
      } else {
        let data = {
          userId: window.localStorage.getItem("id"),
          itemIdx: item.idx,
          point: item.point,
          name: item.name,
        };

        //*확인 클릭시 구매요청 진행
        Swal.fire({
          title: `${item.point}포인트가 차감됩니다. 그래도 하시겠습니까?`,
          icon: "info",
          confirmButtonText: "네!",
          showCancelButton: true,
          cancelButtonText: "안할래요",
        }).then((result) => {
          if (result.isConfirmed) {
            buyItem(data).then(() => {
              window.location.replace("/shop");
            });
          }
        });
      }
    }
  };

  //슬라이더 요소 컴포넌트
  const sliders = () => {
    return img.map((el: any, idx: number) => {
      const mine = myIdList.includes(el.idx);

      let url;
      if (el.type === "svg") {
        const svgStr = el.data;
        const svg = new Blob([svgStr], { type: "image/svg+xml" });
        url = URL.createObjectURL(svg);
      } else {
        url = el.data;
      }

      return (
        <Wrapper key={idx}>
          <ImageWrapper>
            <SingleImage src={url} alt="" onClick={() => openModal(el)} />
            <Text>
              <SubText className="a">{el.name}</SubText>
              <SubText
                className={el.point === 0 ? "b" : "c"}
                onClick={() => handleDirectBuy(el)}
              >
                {el.point === 0 ? "기본아이템" : `💰${el.point}P`}
              </SubText>
            </Text>
            {mine ? (
              ""
            ) : (
              <OverwrapText onClick={() => openModal(el)}>
                미구입상품입니다
              </OverwrapText>
            )}
          </ImageWrapper>
        </Wrapper>
      );
    });
  };

  return (
    <CarouselWrapper>
      {/* <h2> Single Item</h2> */}
      <Slider {...settings}>{sliders()}</Slider>
      {modalOpen ? (
        <ImageModal
          image={current}
          closeModal={closeModal}
          myItem={myItem}
          handleBuyItem={handleBuyItem}
        />
      ) : (
        ""
      )}
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  width: 1000px;
  color: black;
`;

const Wrapper = styled.div`
  padding: 3px 10px 3px 15px;
`;

const ImageWrapper = styled.div`
  width: 217px;
  display: flex;
  flex-direction: column;
  background: white;
  color: ${baseColor};
  border-radius: 11px 11px 11px 11px;
  box-shadow: rgba(50, 50, 93, 0.5) 0px 0px 10px 0px;
  cursor: pointer;

  :hover {
    outline: 3px solid #b22490;
  }
`;

const SingleImage = styled.img`
  width: 217px;
  height: 167px;
  border-radius: 10px 10px 0px 0px;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 0px 0px 10px 10px;
`;

const SubText = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  height: 100%;
  padding: 14px 0px 14px 0px;
  font-size: 14px;
  cursor: default;

  &.a {
    background: ${baseColor};
    border-radius: 0px 0px 0px 10px;
  }

  &.b {
    background: #b22490;
    border-radius: 0px 0px 10px 0px;
  }

  &.c {
    background: #b22490;
    border-radius: 0px 0px 10px 0px;
    cursor: pointer;
  }

  &.c:hover {
    background: linear-gradient(to right, #ec047a 40%, #b22490 100%);
    font-size: 0;
  }
  &.c:hover:before {
    content: "구매하기";
    font-size: 14px;
  }
`;

const OverwrapText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  color: #ffffff;
  background: #8383839e;
  width: 217px;
  height: 167px;
  border-radius: 10px 10px 0px 0px;

  :hover {
    background: none;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 1);
  }
`;
