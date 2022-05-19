import styled from "styled-components";
import Paper from "paper";
import { DragEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Gift } from "./Gift/Gift";
import Background from "./Background";
import { getUserInfo } from "../../apis/userApi";
import { setMyGift, setUserInfo } from "../../redux/reducers/spaceReducer";
import { getGift, changeGift, deleteGift } from "../../apis/giftApi";
import { tool } from "paper/dist/paper-core";
import { WastebasketIcon } from "./Wastebasket/WastebasketIcon";
import { Storage } from "./Storage/Storage";

import NewGiftIcon from "./NewGift/NewGiftIcon";
import { ConfirmModal } from "../ConfirmModal";

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

  const isEditSpace = props.editSpace;
  const spaceGiftList = props.giftList;
  const [spaceGift, setSpaceGift] = useState<any>([]);
  const [dropGift, setDropGift] = useState<any>([]);
  const [isOpenGift, setIsOpenGift] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [clickedId, setClickedId] = useState<number>();
  const [match, setMatch] = useState<any>([]);
  const userGiftList = useSelector((state: any) => state.spaceReducer.myGift);
  const userInfo = useSelector((state: any) => state.spaceReducer.userInfo);
  const isConfirmModal = useSelector(
    (state: any) => state.spaceReducer.isConfirmModal
  );

  const [isConfirmRes, setIsConfirmRes] = useState(false);

  const themeModal = useSelector(
    (state: any) => state.spaceReducer.isThemeModal
  );

  const [selected, setSelected] = useState<any>();

  let tool: paper.Tool;

  useEffect(() => {
    Paper.install(window);
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    tool = new paper.Tool();
    tool.activate();

    const DropList = userGiftList.filter(
      (item: any) => item.status !== "space"
    );
    console.log(DropList, "newLLL");
    setDropGift(DropList);

    //canvas에 import 하가

    like();

    if (spaceGiftList.length !== 0) {
      importSvg();
    }

    async function getUserGift() {
      const userGiftRes = await getGift();
      if (userGiftRes.status === 200) {
        const spaceGifts = userGiftRes.data.filter(
          (el) => el.status === "space"
        );

        setSpaceGift(spaceGifts);
        dispatch(setMyGift(userGiftRes.data));
      }
    }
    async function getUser() {
      const userData = await getUserInfo();
      dispatch(setUserInfo(userData.data));
    }
    getUserGift();
    getUser();
  }, []);

  useEffect(() => {
    if (isEditSpace) {
      edit();
    } else {
      saveSpace();
    }
  }, [isEditSpace]);

  {
    /** 
     *  useEffect(() => {
    console.log(isConfirmRes, "isConfirmRes");
  }, [isConfirmRes]);
    */
  }

  console.log(
    "canvas",
    "props",
    props,
    "selecotr",
    "userInfo",
    userInfo,
    "userGiftList",
    userGiftList
  );

  //유저정보 불러오기

  //! space에 저장된 선물 불러오기
  function importSvg() {
    //console.log("import", spaceGiftList.length, match.length);

    if (match.length <= spaceGiftList.length) {
      spaceGiftList.forEach((gift: any) => {
        const svgAttr = JSON.parse(gift.svgAttr);
        Paper.project.importSVG(gift.svg, {
          onLoad: function (item: any) {
            //     console.log(item, "itemitem");
            let obj = { id: item.id, gift: gift };
            // setMatch([...match, obj]);
            //   console.log("match", match, item);
            match.push(obj);
            item.position = new Paper.Point(svgAttr.x, svgAttr.y);
            if (item.firstChild.size._width < 300) {
              item.scale(1.5);
            } else {
              item.scale(0.15);
            }
          },
        });
      });
    } else {
      return;
    }
  }

  const like = () => {
    Paper.view.onDoubleClick = (e: any) => {
      const hitItem = Paper.project.activeLayer.children.find((el) =>
        el.contains(e.point)
      );
      if (hitItem) {
        setClickedId(hitItem.id);
        setIsOpenGift(true);
      }
    };
  };

  const edit = () => {
    //! test
    let editClickedItem: any;
    //! onClick
    // console.log(Paper.view, "Paper.view");

    Paper.view.onClick = (e: any) => {
      const test = Paper.project.activeLayer.children.find((el) =>
        el.contains(e.point)
      );

      if (test) {
        if (!editClickedItem) {
          editClickedItem = test;
          editClickedItem.bounds.selected = true;
          setSelected(editClickedItem);
          setClickedId(editClickedItem.id);
        } else {
          editClickedItem.bounds.selected = false;
          editClickedItem = test;
          editClickedItem.bounds.selected = true;
          setClickedId(editClickedItem.id);
        }
      } else {
        editClickedItem.bounds.selected = false;
        editClickedItem = null;
      }

      //console.log("Test", test, match, selected);

      editClickedItem.onDoubleClick = (e: any) => {
        setIsOpenGift(true);
      };

      editClickedItem.onMouseDrag = (e: any) => {
        editClickedItem.position.x += e.delta.x;
        editClickedItem.position.y += e.delta.y;
        if (e.point.x < 90 && e.point.y > 640) {
          //! 확인 모달 띄우기
          //dispatch(setConfirmModal(true));
          alert("remove?");

          //! 응답이 ture라면 삭제하기
          const removeId = match.filter(
            (el: any) => el.id === editClickedItem.id
          );

          deleteGift(removeId[0].gift.idx).then((res) =>
            console.log(res, "removeddddddd")
          );
          editClickedItem.remove();
        }
        if (e.point.x > 1100 && e.point.y > 600) {
          console.log("pppppp12");
          //! 확인 모달 띄우기
          //   dispatch(setConfirmModal(true));
          alert("save?");
          //! 응답이 ture라면 저장하기
          //storage 저장 api  호출

          const editItem = match.filter(
            (el: any) => el.id === editClickedItem.id
          );
          //  console.log("editClickedItem", match, clickedId, editClickedItem);
          const chageData = {
            idx: editItem[0].gift.idx,
            status: "storage",
          };

          changeGift(chageData).then((res) => {
            if (res.status === 201) {
              editClickedItem.remove();
            }
          });
        }

        if (isEditSpace) {
          console.log("pppppp");
          //match arr 에서 clickedId 찾기
          const editItem = match.filter(
            (el: any) => el.id === editClickedItem.id
          );
          console.log(editClickedItem, "editClickedItem", clickedId);
          let svgAttr = JSON.parse(editItem[0].gift.svgAttr);
          svgAttr.x = editClickedItem.position.x;
          svgAttr.y = editClickedItem.position.y;

          svgAttr = JSON.stringify(svgAttr);
          const chageData = {
            idx: editItem[0].gift.idx,
            svgAttr,
            status: "space",
          };

          //해당 item  위치 변경 api  호출
          changeGift(chageData).then((res) => console.log(res, "resss"));
        }

        if (isSave) {
          console.log("도장");
        }
      };
    };

    /* //! delete item key
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
    };*/
  };
  const canvasRef = useRef(null);

  //! 변수
  //let segment: any;
  // let path: any;
  //let selectionRectangle: any;
  //let movePath = false;

  //! dropHandler
  const dropHandler = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // drag시 어떤   target을 잡았는지 찾기
    const targetId = e.dataTransfer.getData("id");

    // newGiftList에서 targetId와 같은건 삭제한다.
    const filteredList = dropGift.filter((el: any) => {
      return el.idx !== Number(targetId);
    });

    // newGiftList에서  targetId와 같은걸 찾는다. 찾은 후 해당  svg를 캔버스에 붙인다
    const targetItem = dropGift.filter((el: any) => {
      return el.idx === Number(targetId);
    });

    dispatch(setMyGift(filteredList));

    console.log("drop", targetItem, dropGift, targetId);
    const x = e.clientX - 150;
    const y = e.clientY - 100;
    const targetSvg = targetItem[0].svg;

    //! svg 속성 값 바꾸기
    let svgAttr = JSON.parse(targetItem[0].svgAttr);
    svgAttr.x = x;
    svgAttr.y = y;
    svgAttr = JSON.stringify(svgAttr);
    const chageData = { idx: targetItem[0].idx, svgAttr, status: "space" };

    //찾은  item canvas에 붙이기
    Paper.project.importSVG(targetSvg, {
      expandShapes: true,

      onLoad: function (item: any) {
        /* const hitOptions = {
          segments: true,
          stroke: true,
          fill: true,
          tolerance: 5,
        };*/
        let obj = { id: item.id, gift: targetItem[0] };
        // setMatch([...match, obj]);
        console.log("svgSize", item.firstChild.size._width);
        match.push(obj);
        item.position = new Paper.Point(x, y);

        if (item.firstChild.size._width < 300) {
          console.log("300");
          item.scale(1.5);
        } else {
          console.log("400");
          item.scale(0.15);
        }

        changeGift(chageData).then((res) => console.log(res, "changeGift"));

        //! 회전 및 사이즈 조절을 위한 코드,,,연구,,,
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
    // function adjustBounds(o: any) {
    //  if (o.data.state === "moving") {
    //   o.data.highlight.position = o.position;
    // } else {
    //   o.data.highlight.children[0].bounds = o.bounds;
    //  }
    //}
  };

  const dragOverHandler = (e: DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  console.log("canvas2", match, isEditSpace);

  function saveSpace() {
    if (!isEditSpace) {
      console.log("실행", match);
    }
  }

  return (
    <>
      <CanvasBox>
        <CanvasArea
          ref={canvasRef}
          id="canvas"
          color={userInfo.theme}
          draggable
          onDrop={(e: any) => dropHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
        ></CanvasArea>
        <NewGiftIcon />
        <WastebasketIcon />
        <Storage />
        {themeModal ? <Background /> : null}
        {isOpenGift ? (
          <Gift setIsOpenGift={setIsOpenGift} item={match} id={clickedId} />
        ) : null}
        {isConfirmModal ? (
          <ConfirmModal setIsConfirmRes={setIsConfirmRes} />
        ) : null}
      </CanvasBox>
    </>
  );
}
