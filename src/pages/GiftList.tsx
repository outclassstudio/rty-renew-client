import { useEffect, useState } from "react";
import { getSentGift } from "../apis/giftApi";
import Layout from "./Layout";
import GiftListBox from "../components/giftList/GiftListBox";
import styled from "styled-components";
import { colorSet, fadeAction } from "../style/global";
import Loading from "../components/Loading";
import NumberCarousel from "../components/common/NumberCarousel";

export default function GistList() {
  const [giftListData, setGiftListData] = useState<Gift.singleGiftDTO[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(12);

  //내가 보낸 선물 리스트 요청
  useEffect(() => {
    getSentGift().then((res) => {
      // console.log(res.data.gift);
      setIsLoading(false);
      if (res.data.gift) {
        setGiftListData(res.data.gift);
      }
    });
  }, []);

  //번호선택 및 범위지정
  const handleSetPage = (page: number) => {
    setStart((page - 1) * 12);
    setEnd(page * 12);
    setPage(page);
  };

  return (
    <Layout title={"보낸 선물 리스트"}>
      {isLoading ? (
        <Loading />
      ) : (
        <MainContainer>
          <Title>🎁보낸 선물 리스트</Title>
          <SubContainer>
            <SubTitle>
              <div>총 {giftListData.length}개의 선물을 보냈어요!</div>
              <div>※ 이미 보낸 선물은 삭제하거나 수정할 수 없습니다.</div>
            </SubTitle>
            <BoxWrapper>
              <GridWrapper>
                {giftListData.slice(start, end).map((el: any, idx: number) => {
                  return <GiftListBox key={idx} data={el} />;
                })}
              </GridWrapper>
            </BoxWrapper>
            <PageNumber>
              <NumberCarousel
                giftListData={giftListData}
                page={page}
                handleSetPage={handleSetPage}
                color={"white"}
                pageLimit={12}
              />
            </PageNumber>
          </SubContainer>
        </MainContainer>
      )}
    </Layout>
  );
}

const MainContainer = styled.div`
  height: calc(100vh - 50px);
`;

const SubContainer = styled.div`
  width: 715px;
  padding: 45px 65px 20px 65px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  box-shadow: rgba(50, 50, 93, 0.3) 0px 0px 15px 0px;
  background: #4c3e9f;
  animation: 0.6s ease-in-out ${fadeAction};
  margin-top: 85px;
  margin-bottom: 50px;
  height: 600px;
`;

const Title = styled.div`
  position: fixed;
  width: 100vw;
  top: 50px;
  left: 0;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-weight: bold;
  color: ${colorSet.base};
  padding: 25px 0px;

  &.scroll {
    box-shadow: rgba(50, 50, 93, 0.3) 0px 0px 15px 0px;
  }
`;

const SubTitle = styled.div`
  color: #ffffff;
  margin-bottom: 15px;
  padding-bottom: 15px;
  font-size: 20px;
  border-bottom: 1px dotted #ffffff86;

  div:nth-child(2) {
    font-size: 13px;
    color: #ffffffb5;
  }
`;

const BoxWrapper = styled.div`
  height: 600px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px 25px;
`;

const PageNumber = styled.div`
  width: 715px;
  display: flex;
  justify-content: center;
  gap: 5px;
  color: white;
  margin-top: 20px;
  font-weight: 200;
`;

const SingleNumber = styled.div`
  cursor: pointer;

  &.selected {
    font-weight: bold;
  }
`;
