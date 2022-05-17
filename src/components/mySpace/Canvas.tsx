import styled from "styled-components";
import Paper from "paper";
import { DragEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Gift } from "./Gift/Gift";
import Background from "./Background";
import { getUserInfo } from "../../apis/userApi";
import { setMyGift, setUserInfo } from "../../redux/reducers/spaceReducer";
import { getGift, changeGift, deleteGift } from "../../apis/giftApi";
import { themeList } from "../../utils/themaList";
import { tool } from "paper/dist/paper-core";
import { WastebasketIcon } from "./Wastebasket/WastebasketIcon";
import { Storage } from "./Storage/Storage";

export const CanvasBox = styled.div`
  margin-top: 50px;
  width: 1280px;
  height: 720px;
`;

export const CanvasArea = styled.canvas`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background-image: url(${(props) => props.color});
  background-size: 100%;
  background-repeat: no-repeat;
`;

export default function Canvas(props: any) {
  const dispatch = useDispatch();

  const editSpace = props.editSpace;
  const giftList = props.giftList;
  const [spaceGift, setSpaceGift] = useState<any>([]);
  const [isOpenGift, setIsOpenGift] = useState(false);
  const [clickedId, setClickedId] = useState<number>();
  const [match, setMatch] = useState<any>([]);
  const newGiftLists = useSelector((state: any) => state.spaceReducer.myGift);
  const userInfo = useSelector((state: any) => state.spaceReducer.userInfo);

  const userTheme = themeList.filter((el) => el.name === userInfo.theme);
  const themeModal = useSelector(
    (state: any) => state.spaceReducer.isThemeModal
  );
  const myInfo = useSelector((state: any) => state.spaceReducer.userInfo);

  //const newGiftLists = useSelector((state: any) => state.spaceReducer.myGift);
  const [selected, setSelected] = useState<any>();

  let tool: paper.Tool;

  useEffect(() => {
    Paper.install(window);
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    tool = new paper.Tool();
    tool.activate();
    //canvas에 import 하가

    draw();

    console.log("내정보", giftList);
    getUserInfo().then((res) => {
      dispatch(setUserInfo(res.data));
    });
  }, [editSpace]);

  useEffect(() => {
    getGift().then((res) => {
      let gift = res.data;
      let spaceGifts = gift.filter((el) => el.status === "space");
      dispatch(setMyGift(gift));
      setSpaceGift(spaceGifts);

      console.log(gift, "Allgift", spaceGifts, spaceGift);
    });
    importSvg();
  }, []);

  //유저정보 불러오기

  //! space에 저장된 선물 불러오기
  function importSvg() {
    console.log("import", spaceGift);

    if (match.legnth !== 0 && match.length <= spaceGift.length) {
      spaceGift.forEach((gift: any) => {
        console.log("forEach", gift, spaceGift);
        const svgAttr = JSON.parse(gift.svgAttr);
        Paper.project.importSVG(gift.svg, {
          onLoad: function (item: any) {
            console.log(item, "itemitem");
            let obj = { id: item.id, gift: gift };
            // setMatch([...match, obj]);
            console.log("match", match, item);
            match.push(obj);
            item.position = new Paper.Point(svgAttr.x, svgAttr.y);
            if (item.firstChild.size._width < 500) {
              item.scale(1.5);
            } else {
              item.scale(0.15);
            }
          },
        });
        console.log(match, "match", giftList);
      });
    }
  }

  const draw = () => {
    //! test
    /*
    let tiger;
    Paper.project.importSVG(
      `https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/tiger.svg`,
      function (item: any) {
        tiger = item;
        tiger.scale(0.2);
        tiger.position = new paper.Point(
          tiger.bounds.width / 2,
          tiger.bounds.height / 2
        );
      }
    );*/

    let a: any;
    //! onClick
    console.log(Paper.view, "Paper.view");
    Paper.view.onClick = (e: any) => {
      // const hitResult = Paper.project.hitTest(e.point, hitOptions);

      const test = Paper.project.activeLayer.children.find((el) =>
        el.contains(e.point)
      );
      if (test) {
        test.bounds.selected = true;
        setSelected(test);
        a = test;
        setClickedId(a.id);
      } else {
        console.log("null", a, selected);
        //  a = selected;
        //  a.bounds.selected = false;
      }

      console.log("Test", test, match, selected);

      //a.bounds.selected = true;

      a.onDoubleClick = (e: any) => {
        setIsOpenGift(true);
      };

      a.onMouseDrag = (e: any) => {
        a.position.x += e.delta.x;
        a.position.y += e.delta.y;
        if (e.point.x < 90 && e.point.y > 640) {
          alert("Remove selected");
          const removeId = match.filter((el: any) => el.id === a.id);
          console.log(match, removeId, "removeId");
          deleteGift(removeId[0].gift.idx).then((res) =>
            console.log(res, "removeddddddd")
          );
          a.remove();
        }
        if (e.point.x > 1100 && e.point.y > 600) {
          alert("save?");

          //storage 저장 api  호출

          const editItem = match.filter((el: any) => el.id === a.id);
          console.log("editItem", match, clickedId, editItem);
          const chageData = {
            idx: editItem[0].gift.idx,
            status: "storage",
          };

          changeGift(chageData).then((res) => console.log(res, "resss"));
          a.remove();
        }

        if (editSpace) {
          console.log("edit");
          //match arr 에서 clickedId 찾기
          const editItem = match.filter((el: any) => el.id === clickedId);
          console.log(editItem[0].gift, "editItem");
          let svgAttr = JSON.parse(editItem[0].gift.svgAttr);
          svgAttr.x = a.position.x;
          svgAttr.y = a.position.y;

          svgAttr = JSON.stringify(svgAttr);
          const chageData = {
            idx: editItem[0].gift.idx,
            svgAttr,
            status: "space",
          };

          //해당 item  위치 변경 api  호출
          changeGift(chageData).then((res) => console.log(res, "resss"));
          console.log("click", clickedId);
        }
      };
    };

    //! delete item key
    tool.onKeyDown = function (e: any) {
      console.log(e, "tool");
      if (e.key === "d") {
        alert("Remove selected");
        const removeId = match.filter((el: any) => el.id === a.id);
        console.log(removeId, "removeId");
        deleteGift(removeId[0].gift.idx).then((res) =>
          console.log(res, "removeddddddd")
        );
        a.remove();
      }
    };
  };

  const canvasRef = useRef(null);

  //! 변수
  let segment: any;
  let path: any;
  let selectionRectangle: any;
  let movePath = false;

  //! dropHandler
  const dropHandler = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // drag시 어떤   target을 잡았는지 찾기
    const targetId = e.dataTransfer.getData("id");

    // newGiftList에서 targetId와 같은건 삭제한다.
    const filteredList = newGiftLists.filter((el: any) => {
      return el.idx !== Number(targetId);
    });

    // newGiftList에서  targetId와 같은걸 찾는다. 찾은 후 해당  svg를 캔버스에 붙인다
    const targetItem = newGiftLists.filter((el: any) => {
      return el.idx === Number(targetId);
    });
    console.log("111111", filteredList, targetId);

    dispatch(setMyGift(filteredList));

    console.log("drop", targetItem, newGiftLists, targetId);
    const x = e.clientX - 150;
    const y = e.clientY - 100;
    const targetSvg = targetItem[0].svg;

    //! svg 속성 값 바꾸기
    let svgAttr = JSON.parse(targetItem[0].svgAttr);
    svgAttr.x = x;
    svgAttr.y = y;
    svgAttr = JSON.stringify(svgAttr);
    const chageData = { idx: targetItem[0].idx, svgAttr, status: "space" };
    console.log(chageData);

    let obj = { id: targetItem[0].id, gift: targetItem[0].gift };
    setMatch([...match, obj]);

    //찾은  item canvas에 붙이기
    Paper.project.importSVG(targetSvg, {
      expandShapes: true,
      //load
      onLoad: function (item: any) {
        const hitOptions = {
          segments: true,
          stroke: true,
          fill: true,
          tolerance: 5,
        };
        //  const tool = new Paper.Tool();
        console.log("dropppp", item);
        item.position = new Paper.Point(x, y);
        if (item.firstChild.size._width < 500) {
          item.scale(1.5);
        } else {
          item.scale(0.15);
        }

        changeGift(chageData).then((res) => console.log(res, "changeGift"));

        /*/drag event
        item.onMouseDrag = function (e: { delta: any }) {
          item.position.x += e.delta.x;
          item.position.y += e.delta.y;
        };

        item.onMouseDown = function (e: { delta: any }) {
          item.bounds.selected = true;
        };*/
        /*
        //! make selectionRectangle
        function makeSelectionRectangle(path: any) {
          if (selected) {
            selectionRectangle = selected;
            console.log(
              "selected################################################",
              selectionRectangle,
              selected
            );
            selectionRectangle.clear();
            console.log("지워지냐", selectionRectangle);
          }

          const reset =
            path.rotation === 0 && path.scaling.x === 1 && path.scaling.y === 1;
          let bounds;
          if (reset) {
            console.log("reset");
            bounds = path.bounds;
            path.pInitialBounds = path.bounds;
          } else {
            bounds = path.pInitialBounds;
          }
          let b = bounds.clone().expand(10, 10);
          selectionRectangle = new Paper.Path.Rectangle(b);
          selectionRectangle.pivot = selectionRectangle.position;
          selectionRectangle.insert(2, new Paper.Point(b.center.x, b.top));
          selectionRectangle.insert(2, new Paper.Point(b.center.x, b.top - 25));
          selectionRectangle.insert(2, new Paper.Point(b.center.x, b.top));
          if (!reset) {
            selectionRectangle.position = path.bounds.center;
            selectionRectangle.rotation = path.rotation;
            selectionRectangle.scaling = path.scaling;
          }
          selectionRectangle.strokeWidth = 2;
          selectionRectangle.strokeColor = "blue";
          selectionRectangle.name = "selection rectangle";
          selectionRectangle.selected = true;

          console.log("maked", selectionRectangle);
          if (selectionRectangle) {
            console.log("정보 존재");
            setSelected(selectionRectangle);
          } else {
            console.log("여기 올사람");
            selectionRectangle.remove();
          }
        }
        console.log("왜사라져ㅑ???", selectionRectangle);
        //! onMouseDown
        item.onMouseDown = function (e: any) {
          console.log(
            "_______________________________________________________________________________________",
            selected,
            selectionRectangle
          );
          if (selectionRectangle) {
            console.log("remove ?????", selectionRectangle);
            selectionRectangle.remove();
            console.log("remove !!!!", selectionRectangle);
          }
          const itemP = new Paper.Path(item);

          console.log("item segment", itemP, item);
          segment = path = null;
          const hitResult = Paper.project.hitTest(e.point, hitOptions);

          console.log(
            hitResult,
            "hit------------",

            //  hitResult.item,
            "----",
            hitResult
          );
          if (!hitResult) {
            return;
          }
          if (e.modifiers.shift) {
            if (hitResult.type === "segment") {
              hitResult.segment.remove();
            }
            return;
          }
          console.log("tooldown type", hitResult.type);
          if (hitResult) {
            path = hitResult.item;
            if (item.contains(e.point)) {
              //  item.bounds.selected = true;
              //  Paper.project.activeLayer.addChild(hitResult.item);
              path.data.state = "moving";
              console.log("path--", path, Paper.project.selectedItems);
            }
            if (hitResult && hitResult.type === "segment") {
              path = Paper.project.selectedItems[0];
              segment = hitResult.segment;
              console.log("path--", path, Paper.project.selectedItems);
              if (e.modifiers.control) {
                path.data.state = "rotating";
              } else {
                path.data.state = "resizing";
                path.data.bounds = path.bounds.clone();
                path.data.scaleBase = e.point - path.bounds.center;
              }
              console.log(path.data);
            }
            //! selectionRectangle
            if (!selected) {
              console.log("만들기");
              makeSelectionRectangle(item);
            } else {
              console.log("지우기", selectionRectangle);
              selectionRectangle = selected;
              selectionRectangle.remove();
              setSelected(null);
              makeSelectionRectangle(item);
            }
          }
          movePath = hitResult.type === "fill";
          if (movePath) {
            // Paper.project.activeLayer.addChild(item);
          }
        };

        item.onDoubleClick = function (e: any) {
          console.log("hihihi", e);
          setIsOpenGift(true);
        };

        //! onMouseDrag
        item.onMouseDrag = function (e: any) {
          console.log("tool dragS");
          if (segment && path.data.state === "rotating") {
            var center = path.bounds.center;
            var baseVec: any = center - e.lastPoint;
            var nowVec: any = center - e.point;
            const angle = nowVec.angle - baseVec.angle;
            if (angle < 0) {
              path.rotate(-45);
            } else {
              path.rotate(45);
            }
            adjustBounds(path);
          } else if (path && path.data.state === "moving") {
            //  path.position += e.delta;
            item.position.x += e.delta.x;
            item.position.y += e.delta.y;
            console.log(selectionRectangle, "positioonjkfdnsklfnklsdnfl");
            selectionRectangle.position.x += e.delta.x;
            selectionRectangle.position.y += e.delta.y;
            //      item.bounds.selected = true;
            //  adjustBounds(item);
          }
        };
        //error*/
      },
    });
    function adjustBounds(o: any) {
      if (o.data.state === "moving") {
        o.data.highlight.position = o.position;
      } else {
        o.data.highlight.children[0].bounds = o.bounds;
      }
    }
  };

  const dragOverHandler = (e: DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <CanvasBox>
        <CanvasArea
          ref={canvasRef}
          id="canvas"
          color="https://i.imgur.com/mpT71SX.jpg"
          draggable
          onDrop={(e: any) => dropHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
        ></CanvasArea>
        <WastebasketIcon />
        <Storage />
        {themeModal ? <Background /> : null}
        {isOpenGift ? (
          <Gift setIsOpenGift={setIsOpenGift} item={match} id={clickedId} />
        ) : null}
      </CanvasBox>
    </>
  );
}
