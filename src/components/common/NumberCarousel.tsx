import Slider from "react-slick";
import styled from "styled-components";
import "../shop/slick.css";
import "../shop/slick-theme.css";
import { colorSet } from "../../style/global";

interface Props {
  giftListData: any[];
  page: number;
  color: string;
  handleSetPage: (page: number) => void;
  pageLimit: number;
}

export default function NumberCarousel({
  giftListData,
  page,
  handleSetPage,
  color,
  pageLimit,
}: Props) {
  //carousel 세팅
  const settings = {
    focusOnSelect: false,
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 25,
    slidesToScroll: 1,
    arrow: true,
  };

  //carousel에 렌더링할 컴포넌트
  const sliders = () => {
    let numberArr: number[] = [];

    if (giftListData.length === 0) {
      numberArr.push(1);
    } else {
      let length: number = Math.ceil(giftListData.length / pageLimit);
      for (let i = 1; i <= length; i++) {
        numberArr.push(i);
      }
    }

    return numberArr.map((el: number, idx: number) => {
      return (
        <SingleNumber
          onClick={() => {
            handleSetPage(el);
          }}
          key={idx}
          className={el === page ? "selected" : ""}
          color={color}
        >
          {el}
        </SingleNumber>
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
  width: 90%;
  color: black;
`;

const SingleNumber = styled.div`
  cursor: pointer;
  color: ${(props) => props.color};
  margin: 0px 2px 5px 2px;
  font-size: 14px;
  font-family: "Jua", sans-serif;

  &.selected {
    font-weight: bold;
    color: ${colorSet.yellow};
  }
`;
