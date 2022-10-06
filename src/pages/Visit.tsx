import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Paper from "paper";
import styled from "styled-components";
import { getOthersGift } from "../apis/giftApi";
import { getOthersInfo } from "../apis/userApi";
import Layout from "./Layout";
import Loading from "../components/Loading";
import { Avatar } from "../components/mySpace/Avatar";
import { NormalBtn } from "../style/btnStyle.style";
import Swal from "sweetalert2";

export default function Visit() {
  const params = useParams();
  const canvasRef = useRef(null);
  const navigate = useNavigate();
  let tool: paper.Tool;

  const [spaceGiftList, setSpaceGiftList] = useState<any>([]);
  const [AllGiftListCount, setAllGiftListCount] = useState<number>();
  const [userInfo, setUserInfo] = useState<any>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //캔버스 세팅 및 유저정보 호출
  useEffect(() => {
    Paper.install(window);
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);
    tool = new paper.Tool();
    tool.activate();

    if (params.id) {
      getOthersInfo(params.id).then((res) => {
        if (res.data.ok && res.data.userInfo) {
          setUserInfo(res.data.userInfo);
          Swal.fire({
            icon: "info",
            title: `이곳은 ${res.data.userInfo.nickname}님의 공간입니다`,
            text: "눈으로 구경만 하실수 있어요!",
            timer: 3000,
            timerProgressBar: true,
            confirmButtonText: "알겠어요",
          });
        }
      });
      getOthersGift(+params.id).then((res) => {
        if (res.data.gift) {
          setAllGiftListCount(res.data.gift.length);
          let list = res.data.gift.filter((el) => {
            return el.status === "space";
          });
          setSpaceGiftList(list);
        }
      });
    }
  }, []);

  //캔버스에 svg세팅
  useEffect(() => {
    if (spaceGiftList.length !== 0) {
      importSvg();
    }
  }, [spaceGiftList]);

  //캔버스에 svg임포트
  function importSvg() {
    console.log(spaceGiftList, "ㅋㅋㅋ");
    spaceGiftList.forEach((gift: any) => {
      const svgAttr = gift.svgAttr;
      Paper.project.importSVG(`http://localhost:3000/${gift.svg.data}`, {
        onLoad: function (item: any) {
          item.position = new Paper.Point(svgAttr.x, svgAttr.y);
          if (item.firstChild.size._width < 200) {
            item.scale(1.5);
          } else {
            item.scale(0.3);
          }

          const pos = new paper.Point(item.position.x, item.position.y - 45);
          const text = new paper.PointText(pos);
          text.justification = "center";
          text.fontWeight = "bold";
          text.fontSize = 15;
          text.fillColor = new paper.Color(1, 1, 1);
          text.shadowOffset = new paper.Point(1, 1);
          text.shadowColor = new paper.Color(0, 0, 0);
          text.content = gift.userFrom.nickname;
          text.position = pos;
          text.data.type = "name";
          text.data.id = gift.id;
        },
      });
    });
  }

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <Layout title={`${userInfo.nickname}님의 공간`}>
      <CanvasBox>
        <CanvasArea
          ref={canvasRef}
          id="canvas"
          themeUrl={userInfo && `http://localhost:3000/${userInfo.theme?.data}`}
        ></CanvasArea>
        <NormalBtn
          className="b"
          width={"200px"}
          height={"45px"}
          onClick={() => navigate("/")}
        >
          내 공간으로 돌아가기
        </NormalBtn>
        <Avatar
          userInfo={userInfo}
          otherGift={spaceGiftList}
          AllGiftListCount={AllGiftListCount}
        />
      </CanvasBox>
    </Layout>
  );
}

const CanvasBox = styled.div`
  width: 100vw;
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  background: none;
`;

interface Theme {
  themeUrl: string | undefined;
}

const CanvasArea = styled.canvas<Theme>`
  width: 1008px;
  height: 567px;
  border-radius: 10px;
  background-image: url(${(props) => props.themeUrl});
  background-size: 100%;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 20px 0px;
`;
