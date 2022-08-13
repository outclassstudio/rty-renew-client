import { useEffect, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { buyItem } from "../../apis/itemApi";
import { NormalBtn } from "../../style/btnStyle.style";
import { colorSet, fadeAction, fadeExpand } from "../../style/global";
import NumberCarousel from "../common/NumberCarousel";

interface Props {
  data: Item.singleItemDTO[];
  handleActiveViewAll: (type: string) => void;
  myData: Users.myinfoDTO;
  myIdList: number[];
  handleGetItem: () => void;
}

export default function ViewAllInShopModal({
  data,
  handleActiveViewAll,
  myData,
  myIdList,
  handleGetItem,
}: Props) {
  const [title, setTitle] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(16);

  //번호선택 및 범위지정
  const handleSetPage = (page: number) => {
    setStart((page - 1) * 16);
    setEnd(page * 16);
    setPage(page);
  };

  //제목설정
  useEffect(() => {
    if (data[0].type === "svg") {
      setTitle("선물상자");
    } else if (data[0].type === "img") {
      setTitle("이미지");
    } else {
      setTitle("테마");
    }
  }, []);

  //모달 안 띄우고 아이템 구입 요청
  const handleDirectBuy = (item: any) => {
    if (myIdList.includes(item.id)) {
      return;
    } else {
      if (myData.point < item.point) {
        Swal.fire({
          title: "포인트가 부족해요!",
          icon: "error",
          confirmButtonText: "네ㅠㅠ",
        });
      } else {
        // let data = {
        //   userId: window.localStorage.getItem("id"),
        //   itemIdx: item.idx,
        //   point: item.point,
        //   name: item.name,
        // };

        //*확인 클릭시 구매요청 진행
        Swal.fire({
          title: `${item.point}포인트가 차감됩니다. 그래도 하시겠습니까?`,
          icon: "info",
          confirmButtonText: "네!",
          showCancelButton: true,
          cancelButtonText: "안할래요",
        }).then((result) => {
          if (result.isConfirmed) {
            buyItem(item.id).then(() => {
              handleGetItem();
            });
          }
        });
      }
    }
  };

  //아이템 선택과 동시에 preview업데이트, 모달창 종료
  const handleOpenModal = () => {
    if (data[0].type === "svg") {
      handleActiveViewAll("svg");
    } else if (data[0].type === "img") {
      handleActiveViewAll("img");
    } else {
      handleActiveViewAll("theme");
    }
  };

  //아이템 컴포넌트
  const renderItems = () => {
    return data.slice(start, end).map((el: Item.singleItemDTO, id: number) => {
      const mine = myIdList.includes(el.id);
      let url = el.data;

      // let url;
      // if (el.type === "svg") {
      //   const svgStr = el.data;
      //   const svg = new Blob([svgStr], { type: "image/svg+xml" });
      //   url = URL.createObjectURL(svg);
      // } else {
      //   url = el.data;
      // }

      return (
        <ImageWrapper key={id}>
          <SingleImage src={url} alt="" />
          <Text>
            <SubText className="a">{el.name}</SubText>
            <SubText
              className={mine ? (el.point === 0 ? "b" : "d") : "c"}
              onClick={() => handleDirectBuy(el)}
            >
              {el.point === 0 ? "기본아이템" : `💰${el.point}P`}
            </SubText>
          </Text>
          {mine ? "" : <OverwrapText>미구입상품입니다</OverwrapText>}
        </ImageWrapper>
      );
    });
  };

  return (
    <MainWrapper>
      <PrvBoxWrapper>
        <PointWrapper>
          <div>🌈모든 {title} 보기</div>
          <div>
            💡{myData.nickname}님의 포인트 : {myData.point} Point
          </div>
        </PointWrapper>
        <NumberCarousel
          giftListData={data}
          page={page}
          handleSetPage={handleSetPage}
          color={"white"}
          pageLimit={16}
        />
        <GridWrapper>
          <GridBox>{renderItems()}</GridBox>
        </GridWrapper>
        <NormalBtn
          onClick={handleOpenModal}
          className="b"
          width={"150px"}
          height={"35px"}
        >
          닫기
        </NormalBtn>
      </PrvBoxWrapper>
      <ModalBg onClick={handleOpenModal}></ModalBg>
    </MainWrapper>
  );
}

const ModalBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: #30303075;
  animation: 0.2s linear ${fadeAction};
`;

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  cursor: default;
  z-index: 10;
`;

const PrvBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: ${colorSet.purple};
  height: 750px;
  color: white;
  box-shadow: rgba(50, 50, 93, 0.7) 0px 0px 15px 0px;
  padding: 15px 35px;
  border-radius: 11px;
  gap: 8px;
  font-weight: bold;
  font-size: 20px;
  z-index: 2;
  animation: 0.2s ease-out ${fadeExpand};
`;

const PointWrapper = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;

  div:nth-child(1) {
    font-size: 22px;
    font-weight: bold;
  }

  div:nth-child(2) {
    font-size: 13px;
    font-weight: 300;
  }
`;

const GridWrapper = styled.div`
  height: 582px;
  margin-bottom: 8px;
`;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  align-items: center;
  gap: 18px;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  color: ${colorSet.base};
  border-radius: 11px 11px 11px 11px;
  box-shadow: rgba(50, 50, 93, 0.5) 0px 0px 10px 0px;

  :hover {
    outline: 3px solid ${colorSet.darkPink};
  }
`;

const SingleImage = styled.img`
  width: 130px;
  height: 100px;
  border-radius: 10px 10px 0px 0px;
`;

const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 13px;
  font-weight: bold;
  border-radius: 0px 0px 10px 10px;
`;

const SubText = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  width: 65px;
  height: 15px;
  padding: 7px 0px 7px 0px;
  font-size: 10px;
  cursor: default;

  &.a {
    background: ${colorSet.base};
    border-radius: 0px 0px 0px 10px;
  }

  &.b {
    background: ${colorSet.darkPink};
    border-radius: 0px 0px 10px 0px;
  }

  &.c {
    background: ${colorSet.darkPink};
    border-radius: 0px 0px 10px 0px;
    cursor: pointer;
  }

  &.c:hover {
    background: linear-gradient(to right, #ec047a 40%, #b22490 100%);
    font-size: 0;
  }

  &.c:hover:before {
    content: "구매하기";
    font-size: 10px;
  }

  &.d {
    background: ${colorSet.darkPink};
    border-radius: 0px 0px 10px 0px;
    cursor: pointer;
  }

  &.d:hover {
    background: linear-gradient(to right, #ec047a 40%, #b22490 100%);
    font-size: 0;
  }

  &.d:hover:before {
    content: "구입함";
    font-size: 10px;
  }
`;

const OverwrapText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  color: #ffffff;
  background: #8383839e;
  width: 130px;
  height: 100px;
  border-radius: 10px 10px 0px 0px;
  font-size: 12px;

  :hover {
    background: none;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 1);
  }
`;
