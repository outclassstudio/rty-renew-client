import Slider from "react-slick";
import styled from "styled-components";
import { BASE_URL } from "../../constants";
import { colorSet } from "../../style/global";

interface Props {
  data: getSingleItem[];
  handleSetPrv: (idx: number, url: string) => void;
  prvItem: { id: null | number; url?: string; svg?: string };
}

interface getSingleItem {
  id: number;
  type: string;
  data: string;
  point?: number;
}

export default function SendItemListCarousel({
  data,
  handleSetPrv,
  prvItem,
}: Props) {
  //carousel 세팅
  const settings = {
    focusOnSelect: false,
    dots: false,
    infinite: false,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrow: true,
    draggable: false,
  };

  //carousel에 렌더링할 컴포넌트
  const sliders = () => {
    return data.map((el: any, id: number) => {
      let url: string = el.data;
      // if (el.type === "svg") {
      //   const svgStr = el.data;
      //   const svg = new Blob([svgStr], { type: "image/svg+xml" });
      //   url = URL.createObjectURL(svg);
      // } else {
      //   url = el.data;
      // }

      return (
        <ImageWrapper key={id}>
          <SingleSvg
            onClick={() => handleSetPrv(el.id, url)}
            className={el.id === prvItem.id ? "active" : ""}
            src={`${BASE_URL}${url}`}
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
    outline: 3px solid ${colorSet.base};
  }
`;
