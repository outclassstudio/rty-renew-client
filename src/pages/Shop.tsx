import Layout from "./Layout";
import ItemListCarousel from "../components/shop/ItemListCarousel";
import MyPoint from "../components/shop/MyPoint";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { getItems, getMyItems } from "../apis/buyApi";
import { colorSet, fadeMoveAction, fadeMoveActionDelay } from "../style/global";
import { getUserInfo } from "../apis/userApi";
import Loading from "../components/Loading";
import ViewAllInShopModal from "../components/shop/ViewAllInShopModal";

export default function Shop() {
  const [img, setImg] = useState<any>([]);
  const [svg, setSvg] = useState<any>([]);
  const [theme, setTheme] = useState<any>([]);
  const [myIdList, setmyIdList] = useState<any>([]);
  const [myData, setMyData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [svgModal, setSvgModal] = useState<boolean>(false);
  const [imgModal, setImgModal] = useState<boolean>(false);
  const [themeModal, setThemeModal] = useState<boolean>(false);

  //아이템 및 유저정보 불러와서 세팅 함수
  const handleGetItem = () => {
    //*아이템세팅
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

      const theme = res.data.filter((el) => {
        return el.type === "theme";
      });
      setTheme(theme);

      getMyItems().then((res) => {
        let ids = res.data.map((el: any) => {
          return el.idx;
        });

        setmyIdList(ids);
      });
    });

    //*유저정보세팅
    getUserInfo().then((res) => {
      setMyData(res.data);
    });
  };

  //유저정보 및 아이템 세팅 함수 실행
  useEffect(() => {
    handleGetItem();
  }, []);

  //아이템 전체보기 on/off
  const handleActiveViewAll = (type: string) => {
    if (type === "svg") {
      setSvgModal((prev) => !prev);
    } else if (type === "img") {
      setImgModal((prev) => !prev);
    } else if (type === "theme") {
      setThemeModal((prev) => !prev);
    }
  };

  return (
    <Layout title={"상점"}>
      {isLoading ? (
        <Loading />
      ) : (
        <MainContainer>
          <MyPoint myData={myData} />
          <SubContainer className="a">
            <Text>
              🎁선물 포장 구입하기
              <img
                src="https://cdn.discordapp.com/attachments/974114424036155505/978082271208800256/menusgrey.png"
                alt=""
                onClick={() => handleActiveViewAll("svg")}
              />
            </Text>
            <CarouselWrapper>
              <ItemListCarousel
                myData={myData}
                myIdList={myIdList}
                img={svg}
                handleGetItem={handleGetItem}
              />
            </CarouselWrapper>
          </SubContainer>
          <SubContainer className="b">
            <Text>
              📸이미지 구입하기
              <img
                src="https://cdn.discordapp.com/attachments/974114424036155505/978082271208800256/menusgrey.png"
                alt=""
                onClick={() => handleActiveViewAll("img")}
              />
            </Text>
            <CarouselWrapper>
              <ItemListCarousel
                myData={myData}
                myIdList={myIdList}
                img={img}
                handleGetItem={handleGetItem}
              />
            </CarouselWrapper>
          </SubContainer>
          <SubContainer className="c">
            <Text>
              🎪테마 구입하기
              <img
                src="https://cdn.discordapp.com/attachments/974114424036155505/978082271208800256/menusgrey.png"
                alt=""
                onClick={() => handleActiveViewAll("theme")}
              />
            </Text>
            <CarouselWrapper>
              <ItemListCarousel
                myData={myData}
                myIdList={myIdList}
                img={theme}
                handleGetItem={handleGetItem}
              />
            </CarouselWrapper>
          </SubContainer>
          {svgModal ? (
            <ViewAllInShopModal
              myData={myData}
              myIdList={myIdList}
              data={svg}
              handleActiveViewAll={handleActiveViewAll}
              handleGetItem={handleGetItem}
            />
          ) : (
            ""
          )}
          {imgModal ? (
            <ViewAllInShopModal
              myData={myData}
              myIdList={myIdList}
              data={img}
              handleActiveViewAll={handleActiveViewAll}
              handleGetItem={handleGetItem}
            />
          ) : (
            ""
          )}
          {themeModal ? (
            <ViewAllInShopModal
              myData={myData}
              myIdList={myIdList}
              data={theme}
              handleActiveViewAll={handleActiveViewAll}
              handleGetItem={handleGetItem}
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
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
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

  &.c {
    animation: 0.8s ease-in-out ${fadeMoveActionDelay};
  }
`;

const CarouselWrapper = styled.div`
  box-shadow: rgba(50, 50, 93, 0.3) 0px 0px 15px 0px;
  background: #4c3e9f;
  padding: 24px 40px;
`;

const Text = styled.div`
  font-size: 22px;
  font-weight: bold;
  color: ${colorSet.base};
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
    padding: 5px;
  }

  img:hover {
    background: ${colorSet.skyBlue};
  }
`;
