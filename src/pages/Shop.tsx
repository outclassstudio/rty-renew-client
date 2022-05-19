import Layout from "./Layout";
import ItemListCarousel from "../components/shop/ItemListCarousel";
import MyPoint from "../components/shop/MyPoint";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getItems, getMyItems } from "../apis/buyApi";
import { colorSet, fadeMoveAction, fadeMoveActionDelay } from "../style/global";
import { getUserInfo } from "../apis/userApi";
import Loading from "../components/Loading";

export default function Shop() {
  const [img, setImg] = useState<any>([]);
  const [svg, setSvg] = useState<any>([]);
  const [myIdList, setmyIdList] = useState<any>([]);
  const [myData, setMyData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //유저정보 불러오기
  useEffect(() => {
    getUserInfo().then((res) => {
      setMyData(res.data);
    });
  }, []);

  //아이템 불러와서 타입별로 분류
  useEffect(() => {
    getItems().then((res) => {
      setIsLoading(false);

      const img = res.data.filter((el) => {
        return el.type === "img";
      });
      setImg(img);

      const svg = res.data.filter((el) => {
        return el.type === "svg";
      });
      setSvg(svg);

      getMyItems().then((res) => {
        let ids = res.data.map((el: any) => {
          return el.idx;
        });

        setmyIdList(ids);
      });
    });
  }, []);

  return (
    <Layout title={"상점"}>
      {isLoading ? (
        <Loading />
      ) : (
        <MainContainer>
          <MyPoint myData={myData} />
          <SubContainer className="a">
            <Text>🎁선물 포장 구입하기</Text>
            <CarouselWrapper>
              <ItemListCarousel myData={myData} myIdList={myIdList} img={svg} />
            </CarouselWrapper>
          </SubContainer>
          <SubContainer className="b">
            <Text>📸이미지 구입하기</Text>
            <CarouselWrapper>
              <ItemListCarousel myData={myData} myIdList={myIdList} img={img} />
            </CarouselWrapper>
          </SubContainer>
        </MainContainer>
      )}
    </Layout>
  );
}

const MainContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 30px;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;

  &.a {
    animation: 0.6s ease-in-out ${fadeMoveAction};
  }

  &.b {
    animation: 0.7s ease-in-out ${fadeMoveActionDelay};
  }
`;

const CarouselWrapper = styled.div`
  box-shadow: rgba(50, 50, 93, 0.3) 0px 0px 15px 0px;
  background: #4c3e9f;
  padding: 30px 45px 30px 45px;
`;

const Text = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: ${colorSet.base};
  margin-bottom: 15px;
`;
