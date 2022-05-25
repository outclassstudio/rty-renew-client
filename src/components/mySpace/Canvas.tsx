import styled from "styled-components";
import Paper from "paper";
import { DragEvent, useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Gift } from "./Gift/Gift";
import Background from "./Background";
import {
  setConfirmModal,
  setConfirmRes,
  setIsOpenSave,
  setIsOpenTrash,
  setMyGift,
  setNewGift,
  setStorageGift,
} from "../../redux/reducers/spaceReducer";
import { changeGift, deleteGift, changeGiftPosition } from "../../apis/giftApi";
import { PointText, projects, tool } from "paper/dist/paper-core";
import { WastebasketIcon } from "./Wastebasket/WastebasketIcon";
import { Storage } from "./Storage/Storage";
import NewGiftIcon from "./NewGift/NewGiftIcon";
import { ConfirmModal } from "../ConfirmModal";
import { debug } from "console";

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
  box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 20px 0px;
`;

export default function Canvas(props: any) {
  const dispatch = useDispatch();

  const isEditSpace = props.editSpace;
  const spaceGiftList = props.giftList;
  const isEditMove = props.editMove;
  const saveSpace = props.saveSpace;
  const [count, setCount] = useState<number>(1);
  const [msg, setMsg] = useState<string>("");
  const [changeData, setChageData] = useState<any>();
  const [dropNewGift, setNewDropGift] = useState<any>([]);
  const [dropStorage, setDropStorage] = useState<any>([]);
  const [isOpenGift, setIsOpenGift] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [clickedId, setClickedId] = useState<number>();
  const [match, setMatch] = useState<any>([]);
  const [editClickedItem, setEditClickedItem] = useState<any>();
  const userGiftList = useSelector((state: any) => state.spaceReducer.myGift);
  const userInfo = useSelector((state: any) => state.spaceReducer.userInfo);
  const isOpenTrash = useSelector(
    (state: any) => state.spaceReducer.isOpenTrash
  );
  const isOpenSave = useSelector((state: any) => state.spaceReducer.isOpenSave);
  const storageGiftLists = useSelector(
    (state: any) => state.spaceReducer.storageGiftList
  );
  const clickBtn = useSelector((state: any) => state.spaceReducer.clickBtn);
  const isConfirmModal = useSelector(
    (state: any) => state.spaceReducer.isConfirmModal
  );
  const isConfirmRes = useSelector(
    (state: any) => state.spaceReducer.isConfirmRes
  );

  //const [isConfirmRes, setIsConfirmRes] = useState(false);

  const themeModal = useSelector(
    (state: any) => state.spaceReducer.isThemeModal
  );

  const [selected, setSelected] = useState<any>();

  let tool: paper.Tool;

  useEffect(() => {
    console.log("경로", userInfo);

    Paper.install(window);
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    tool = new paper.Tool();
    tool.activate();

    const DropNewList =
      userGiftList && userGiftList.filter((item: any) => item.status === "new");
    setNewDropGift(DropNewList);

    const DropStorageGfit =
      userGiftList &&
      userGiftList.filter((item: any) => item.status === "storage");
    setNewDropGift(DropStorageGfit);
    //canvas에 import 하가

    like();
    // tiger();
    if (spaceGiftList && spaceGiftList.length !== 0) {
      importSvg();
    }
  }, []);

  useEffect(() => {
    if (saveSpace && count !== 1) {
      saveSpace12();
    }
    //  console.log(isEditMove, "moves", saveSpace);
  }, [isEditSpace, isEditMove, saveSpace, count, saveSpace12]);

  useEffect(() => {
    if (saveSpace && count >= 1) {
      console.log("impoirt");
      //  importSvg();
      Paper.project.activeLayer.children.forEach((el) => {
        if (el.data.type === "name") {
          console.log("nameposition", el.position);
          el.visible = true;
        }
      });
      if (editClickedItem) {
        setEditClickedItem(null);
        editClickedItem.bounds.selected = false;
        editClickedItem.onMouseDrag = function abc() {};
      }
    } else {
      Paper.project.activeLayer.children.forEach((el) => {
        if (el.data.type === "name") {
          el.visible = false;
          el.bounds.selected = false;
        }
      });
      Paper.view.onClick = (e: any) => {
        // console.log("eidtfunction");
        const test = Paper.project.activeLayer.children.find((el) =>
          el.contains(e.point)
        );
        if (test?.data.type === "name") {
          editClickedItem.onMouseDrag = function abc() {};
          editClickedItem.onDoubleClick = function abc() {};
          return;
        }
        console.log("eidtfunction", test, Paper.project.activeLayer.children);
        // setEditClickedItem(test);
        if (test) {
          if (!editClickedItem) {
            console.log("false09090", test);
            setEditClickedItem(test);
            test.bounds.selected = true;
            setSelected(test);
            setClickedId(test.id);
          } else {
            console.log("false09090", editClickedItem);
            editClickedItem.bounds.selected = false;
            setEditClickedItem(test);
            test.bounds.selected = true;
            setClickedId(test.id);
          }
          test.onMouseDrag = (e: any) => {
            console.log("drag", e);
            test.position.x += e.delta.x;
            test.position.y += e.delta.y;

            //! 움직인걸 찾아라!
          };
          return;
        } else {
          Paper.project.activeLayer.children.forEach((el) => {
            if (el.bounds.selected) {
              el.bounds.selected = false;
            }
          });
          // editClickedItem.bounds.selected = false;
          setEditClickedItem(null);
        }

        if (!test) {
          return;
        }
        // test.onDoubleClick = (e: any) => {
        //   setIsOpenGift(true);
        // };
      };
      //! 쓰레기통 클릭 후  아이템 삭제하기
      if (isOpenTrash && editClickedItem && !isConfirmModal) {
        setMsg("정말 삭제");
        dispatch(setConfirmModal(true));

        const removeId = match.filter(
          (el: any) => el.id === editClickedItem.id
        );

        setChageData(removeId[0].gift.idx);
        editClickedItem.bounds.selected = false;
      } else if (isOpenSave && editClickedItem && !isConfirmModal) {
        setMsg("저장");
        dispatch(setConfirmModal(true));
        const editItem = match.filter(
          (el: any) => el.id === editClickedItem.id
        );

        //status 변경
        const changeData = {
          idx: editItem[0].gift.idx,
          status: "storage",
          userTo: window.localStorage.getItem("id"),
        };
        setChageData(changeData);
        editClickedItem.bounds.selected = false;
      } else if (isConfirmRes && editClickedItem) {
        editClickedItem.remove();
        editClickedItem.bounds.selected = false;
        setEditClickedItem(null);
        dispatch(setConfirmRes(false));
      } else if (
        !isConfirmRes &&
        editClickedItem &&
        !editClickedItem.bounds.selected
      ) {
        console.log("여기??");
        //  editClickedItem.bounds.selected = false;
        setEditClickedItem(null);
      }
    }

    setCount(count + 1);
    console.log("isConfirmRes", isConfirmRes);
  }, [
    saveSpace,
    editClickedItem,
    isConfirmRes,
    isOpenTrash,
    isOpenSave,
    isConfirmRes,
  ]);

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

  //! test isOpenTrash

  //! test save

  //! test tiger
  // const tiger = () => {
  //   const url = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/tiger.svg`;
  //   let a;
  //   Paper.project.importSVG(url, function (item: any) {
  //     a = item;
  //     a.scale(0.2);
  //     a.position = new paper.Point(
  //       a.bounds.width + 500 / 2,
  //       a.bounds.height + 800 / 2
  //     );
  //     console.log("aa", a.bounds.top);
  //     var pos = new paper.Point(a.bounds.top);
  //     // pos could really be anything here
  //     var text = new paper.PointText(pos);
  //     text.justification = "center";
  //     text.fontWeight = "bold";
  //     text.fontSize = 24;

  //     text.content = "save";
  //     // now use the adjusted drop point to set the center position
  //     // of text.
  //     text.position = pos;
  //   });
  // };

  //유저정보 불러오기

  //! space에 저장된 선물 불러오기
  function importSvg() {
    if (match.length <= spaceGiftList.length) {
      spaceGiftList.forEach((gift: any) => {
        const svgAttr = JSON.parse(gift.svgAttr);
        Paper.project.importSVG(gift.svg, {
          onLoad: function (item: any) {
            console.log(gift, "itemitem");
            let obj = { id: item.id, gift: gift };
            // setMatch([...match, obj]);
            console.log("match", item);
            match.push(obj);
            item.data.idx = gift.idx;
            item.position = new Paper.Point(svgAttr.x, svgAttr.y);
            if (item.firstChild.size._width < 200) {
              item.scale(1.5);
            } else {
              item.scale(0.15);
            }
            // //! text
            const pos = new paper.Point(
              item.position.x + 5,
              item.position.y - 45
            );
            //  pos could really be anything here
            const text = new paper.PointText(pos);
            text.justification = "center";
            text.fontWeight = "bold";
            text.fontSize = 17;
            text.content = gift.userFrom;
            //  now use the adjusted drop point to set the center position of text.
            text.position = pos;
            text.data.type = "name";
            text.data.id = gift.idx;
          },
        });
      });
    } else {
      return;
    }
  }

  //! open letter
  const like = () => {
    Paper.view.onDoubleClick = (e: any) => {
      const hitItem = Paper.project.activeLayer.children.find((el) =>
        el.contains(e.point)
      );

      if (hitItem?.data.type === "name") {
        hitItem.onMouseDrag = function abc() {};
        hitItem.onDoubleClick = function abc() {};
        return;
      }
      if (hitItem) {
        setClickedId(hitItem.id);
        setIsOpenGift(true);
      }
    };
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

    //dropGift는 상태가  new, storage이다.
    // new or storage list에서  targetId와 같은건 삭제한다.
    const filteredNew = dropNewGift.filter((el: any) => {
      return el.idx !== Number(targetId);
    });

    const filteredStorage = dropStorage.filter((el: any) => {
      return el.idx !== Number(targetId);
    });

    //dropStorage;

    // newGiftList에서  targetId와 같은걸 찾는다. 찾은 후 해당  svg를 캔버스에 붙인다
    const targetItem = userGiftList.filter((el: any) => {
      return el.idx === Number(targetId);
    });
    console.log("canvasfilteredList", targetItem, filteredStorage);

    console.log("drop", targetItem, dropNewGift, targetId);
    const x = e.clientX - 320;
    const y = e.clientY - 100;
    const targetSvg = targetItem[0].svg;

    //! svg 속성 값 바꾸기
    let svgAttr = JSON.parse(targetItem[0].svgAttr);
    svgAttr.x = x;
    svgAttr.y = y;
    svgAttr = JSON.stringify(svgAttr);
    const chageData = {
      idx: targetItem[0].idx,
      svgAttr,
      status: "space",
      userTo: window.localStorage.getItem("id"),
    };

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
        item.data.idx = targetItem[0].idx;
        if (item.firstChild.size._width < 200) {
          // console.log("300");
          item.scale(1.5);
        } else {
          // console.log("400");
          item.scale(0.15);
        }

        // //! text
        const pos = new paper.Point(item.position.x + 5, item.position.y - 45);
        //  pos could really be anything here
        const text = new paper.PointText(pos);
        text.justification = "center";
        text.fontWeight = "bold";
        text.fontSize = 16;

        text.content = targetItem[0].userFrom;
        //  now use the adjusted drop point to set the center position of text.
        text.position = pos;
        text.data.type = "name";
        text.data.id = targetItem[0].idx;

        //  dispatch(setStorageGift(filteredStorage));
        // dispatch(setNewGift(filteredNew));

        changeGift(chageData).then(async (res) => {
          console.log(res, "123123");
          if (res.status === 200) {
            const filteredList = await res.data.filter(
              (el: any) => el.status === "storage"
            );
            const filteredNew = await res.data.filter(
              (el: any) => el.status === "new"
            );
            console.log("123123", res.data, filteredList);
            dispatch(setStorageGift(filteredList));
            dispatch(setNewGift(filteredNew));
          }
        });

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

  console.log("canvas2", isEditSpace, editClickedItem);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function saveSpace12() {
    dispatch(setIsOpenTrash(false));
    dispatch(setIsOpenSave(false));
    //! 1. match 와 activeLayer의 children에서 동일한 id를 찾고 포지션을 비교한다.
    console.log("spaveSpace1", match);
    let activeLayer: paper.Item[] = [];
    Paper.project.activeLayer.children.forEach((el) => {
      activeLayer.push(el);
      //console.log(el.data.idx, el.position, el.id, "paper", match, activeLayer);
    });
    const MoveArr: any = [];

    match.forEach((el: any) => {
      activeLayer.forEach((layer) => {
        console.log("savelayer", layer.data.id);
        if (el.id === layer.id) {
          console.log("savelayer1212", layer, layer.data.idx);
          const svgAttr = JSON.parse(el.gift.svgAttr);
          //   console.log("equalId", el.gift.svgAttr, layer.position.x, svgAttr);
          if (
            svgAttr.x !== layer.position.x ||
            svgAttr.y !== layer.position.y
          ) {
            const newPosition = { x: layer.position.x, y: layer.position.y };
            let data = {
              idx: layer.data.idx,
              svgAttr: JSON.stringify(newPosition),
              userTo: localStorage.getItem("id"),
            };

            MoveArr.push(data);
            console.log("spaveSpace211111", data);
          }
        }
        if (layer.data.type === "name") {
          MoveArr.forEach((el: any) => {
            if (el.idx === layer.data.id) {
              const position = JSON.parse(el.svgAttr);
              layer.position.x = position.x + 5;
              layer.position.y = position.y - 45;
            }
          });
          console.log(
            "",
            layer.data.idx,
            //    JSON.parse(MoveArr[0].svgAttr),

            el.gift.idx,
            layer.data
          ); // 요 포지션은 해당 아이템의 포지션 으로 바꿔준다.
        }
      });
    });
    if (!MoveArr.length) {
      return;
    } else {
      changeGiftPosition(MoveArr).then((res) => {
        if (res.status === 200) {
          console.log(res, "changeGiftPosition");
          //바뀐 위치 이름 포지션도 바꿔주자
        }
      });
    }
    if (editClickedItem) {
      editClickedItem.bounds.selected = false;
      setEditClickedItem(null);
    }
    Paper.project.activeLayer.children.forEach((el) => {
      if (el.data.type === "name") {
        console.log("nameposition", el.position);
        el.visible = true;
      }
    });
  }

  return (
    <>
      <CanvasBox>
        <NewGiftIcon />
        {isEditSpace && !editClickedItem ? <WastebasketIcon /> : null}
        {isEditSpace && !editClickedItem ? (
          <Storage isEditSpace={isEditSpace} />
        ) : (
          <Storage />
        )}

        <CanvasArea
          ref={canvasRef}
          id="canvas"
          color={userInfo.theme}
          draggable
          onDrop={(e: any) => dropHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
        ></CanvasArea>

        {themeModal ? <Background /> : null}
        {isOpenGift ? (
          <Gift setIsOpenGift={setIsOpenGift} item={match} id={clickedId} />
        ) : null}
        {isConfirmModal && isOpenTrash && editClickedItem ? (
          <ConfirmModal msg={msg} changeData={changeData} />
        ) : null}
        {isConfirmModal && isOpenSave && editClickedItem ? (
          <ConfirmModal msg={msg} changeData={changeData} />
        ) : null}
      </CanvasBox>
    </>
  );
}
