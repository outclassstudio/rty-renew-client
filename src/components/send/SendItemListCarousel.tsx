import Slider from "react-slick";
// import "./send-slick.css";
// import "./send-slick-theme.css";
import styled from "styled-components";
import { baseColor } from "../../style/global";

export default function SendItemListCarousel({
  data,
  handleSetPrv,
  prvItem,
}: any) {
  //carousel 세팅
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrow: true,
  };

  //carousel에 렌더링할 컴포넌트
  const sliders = () => {
    return data.map((el: any, idx: number) => {
      let url: string;
      if (el.type === "svg") {
        const svgStr = el.data;
        const svg = new Blob([svgStr], { type: "image/svg+xml" });
        url = URL.createObjectURL(svg);
      } else {
        url = el.data;
      }

      return (
        <ImageWrapper key={idx}>
          <SingleSvg
            onClick={() => handleSetPrv(el.idx, url)}
            className={el.idx === prvItem.id ? "active" : ""}
            src={url}
          />
        </ImageWrapper>
      );
    });
  };

  return (
    <CarouselWrapper>
      <Slider {...settings}>{sliders()}</Slider>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.div`
  width: 100%;
  color: black;
`;

const ImageWrapper = styled.div`
  padding: 5px 5px;
`;

const SingleSvg = styled.img`
  width: 76px;
  height: 57px;
  cursor: pointer;
  border-radius: 7px;

  &.active {
    outline: 3px solid ${baseColor};
  }
`;
