import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { getOthersGift } from "../apis/giftApi";
import Layout from "./Layout";
import Paper from "paper";
import styled from "styled-components";
import { NormalBtn } from "../style/btnStyle.style";
import Swal from "sweetalert2";
import { getOthersInfo } from "../apis/userApi";
import VisitAvatar from "../components/visit/VisitAvatar";

export default function Visit() {
  const params = useParams();
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [spaceGiftList, setSpaceGiftList] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>("");

  let tool: paper.Tool;

  //캔버스 세팅 및 유저정보 호출
  useEffect(() => {
    Swal.fire({
      icon: "info",
      title: `이곳은 ${params.id}님의 공간입니다`,
      text: "눈으로 구경만 하실수 있어요!",
      timer: 3000,
      timerProgressBar: true,
      confirmButtonText: "알겠어요",
    });

    Paper.install(window);
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);
    tool = new paper.Tool();
    tool.activate();

    getOthersGift(params.id).then((res) => {
      let list = res.data.filter((el) => {
        return el.status === "space";
      });

      setSpaceGiftList(list);
    });
    like();

    getOthersInfo(params.id).then((res) => {
      setUserInfo(res.data);
    });
  }, []);

  //캔버스에 svg세팅
  useEffect(() => {
    if (spaceGiftList.length !== 0) {
      importSvg();
    }
  }, [spaceGiftList]);

  //캔버스에 svg임포트
  function importSvg() {
    spaceGiftList.forEach((gift: any) => {
      const svgAttr = JSON.parse(gift.svgAttr);
      Paper.project.importSVG(gift.svg, {
        onLoad: function (item: any) {
          let obj = { id: item.id, gift: gift };
          item.position = new Paper.Point(svgAttr.x, svgAttr.y);
          if (item.firstChild.size._width < 300) {
            item.scale(1.5);
          } else {
            item.scale(0.15);
          }
        },
      });
    });

    // if (match.length <= spaceGiftList.length) {
    //   spaceGiftList.forEach((gift: any) => {
    //     const svgAttr = JSON.parse(gift.svgAttr);
    //     Paper.project.importSVG(gift.svg, {
    //       onLoad: function (item: any) {
    //         //     console.log(item, "itemitem");
    //         let obj = { id: item.id, gift: gift };
    //         // setMatch([...match, obj]);
    //         //   console.log("match", match, item);
    //         match.push(obj);
    //         item.position = new Paper.Point(svgAttr.x, svgAttr.y);
    //         if (item.firstChild.size._width < 300) {
    //           item.scale(1.5);
    //         } else {
    //           item.scale(0.15);
    //         }
    //       },
    //     });
    //   });
    // } else {
    //   return;
    // }
  }

  const like = () => {
    Paper.view.onDoubleClick = (e: any) => {
      const hitItem = Paper.project.activeLayer.children.find((el) =>
        el.contains(e.point)
      );
      if (hitItem) {
        // setClickedId(hitItem.id);
        // setIsOpenGift(true);
      }
    };
  };

  return (
    <Layout title={`${params.id}님의 공간`}>
      <CanvasBox>
        <CanvasArea
          ref={canvasRef}
          id="canvas"
          themeUrl={userInfo.theme}
        ></CanvasArea>
        <NormalBtn
          className="b"
          width={"200px"}
          height={"45px"}
          onClick={() => navigate("/")}
        >
          내공간으로 돌아가기
        </NormalBtn>
        <VisitAvatar userInfo={userInfo} />
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
`;

interface Theme {
  themeUrl: string | undefined;
}

const CanvasArea = styled.canvas<Theme>`
  width: 1280px;
  height: 720px;
  border-radius: 10px;
  background-image: url(${(props) => props.themeUrl});
  background-size: 100%;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 20px 0px;
`;
