import styled from "styled-components";
import Paper from "paper";
import { DragEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Gift } from "./Gift/Gift";
import Background from "./Background";
import Swal from "sweetalert2";
import {
  setConfirmModal,
  setConfirmRes,
  setIsOpenSave,
  setIsOpenTrash,
  setIsRandom,
  setNewGift,
  setSpaceGift,
  setStorageGift,
} from "../../redux/reducers/spaceReducer";
import { changeGift, changeGiftPosition } from "../../apis/giftApi";
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
  box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 20px 0px;
`;

export default function Canvas(props: any) {
  const dispatch = useDispatch();

  const isEditSpace = props.editSpace;
  const spaceGiftList = props.giftList;

  const saveSpace = props.saveSpace;
  const [count, setCount] = useState<number>(1);
  const [msg, setMsg] = useState<string>("");
  const [changeData, setChageData] = useState<any>();
  const [dropNewGift, setNewDropGift] = useState<any>([]);
  const [isOpenGift, setIsOpenGift] = useState(false);

  const [curTag, setCurTag] = useState<any>();
  const [clickedId, setClickedId] = useState<number>();
  const [match, setMatch] = useState<any>([]);
  const [editClickedItem, setEditClickedItem] = useState<any>();
  const userGiftList = useSelector((state: any) => state.spaceReducer.myGift);
  const userInfo = useSelector((state: any) => state.spaceReducer.userInfo);
  const isOpenTrash = useSelector(
    (state: any) => state.spaceReducer.isOpenTrash
  );
  const isOpenSave = useSelector((state: any) => state.spaceReducer.isOpenSave);

  const isRandom = useSelector((state: any) => state.spaceReducer.isRandom);

  const spaceGiftLists = useSelector(
    (state: any) => state.spaceReducer.spaceGiftList
  );
  const isConfirmModal = useSelector(
    (state: any) => state.spaceReducer.isConfirmModal
  );
  const isConfirmRes = useSelector(
    (state: any) => state.spaceReducer.isConfirmRes
  );
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
  }, [saveSpace, count, saveSpace12]);

  useEffect(() => {
    if (isRandom) {
      giftRandomHandler();
    }
  }, [isRandom]);

  useEffect(() => {
    tool = new paper.Tool();
    tool.activate();

    if (saveSpace && count >= 1) {
      //  importSvg();
      Paper.project.activeLayer.children.forEach((el) => {
        if (el.data.type === "name") {
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
        const test = Paper.project.activeLayer.children.find((el) =>
          el.contains(e.point)
        );

        // if (hit.type === "bounds") {
        //   hit.item.onMouseDrag = (e: any) => {
        //     console.log(e, "hit");
        //     let path = editClickedItem;

        //     var center: any = path.bounds.center;
        //     var baseVec: any = center - e.lastPoint;
        //     var nowVec: any = center - e.point;
        //     const angle = nowVec.angle - baseVec.angle;
        //     if (angle < 0) {
        //       path.rotate(-45);
        //     } else {
        //       path.rotate(45);
        //     }
        //     console.log(editClickedItem, "roation");
        //   };
        // }
        const nameTag = Paper.project.activeLayer.children.find(
          (el) => el.data.id === test?.data.idx
        );
        if (nameTag) setCurTag(nameTag);
        //click 한거 idx 랑 같은 text data.id 저장
        if (test?.data.type === "name") {
          editClickedItem.onMouseDrag = function abc() {};
          editClickedItem.onDoubleClick = function abc() {};
          return;
        }

        // setEditClickedItem(test);
        if (test) {
          if (!editClickedItem) {
            setEditClickedItem(test);

            test.bounds.selected = true;
            setSelected(test);
            setClickedId(test.id);

            // // const myCircle = new Paper.Path.Circle(
            // //   new Paper.Point(test.position.x, test.position.y),
            // //   100
            // // );
            // let b = test.bounds.clone().expand(20, 20);
            // myRectangle = new Paper.Path.Rectangle(b);
            // myRectangle.position = new Paper.Point(test.bounds.center);
            // myRectangle.data.type = "edit";
            // //   myCircle.data.id = test.id;
            // myRectangle.strokeColor = new Color(0b1111);
            // myRectangle.strokeWidth = 10;

            // setIsBox(!isBox);
          } else {
            editClickedItem.bounds.selected = false;
            setEditClickedItem(test);
            test.bounds.selected = true;
            setClickedId(test.id);
          }

          test.onMouseDrag = (e: any) => {
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

          setEditClickedItem(null);
        }

        if (!test) {
          return;
        }
      };

      let count = editClickedItem?.data.rotation || 0;
      tool.onKeyDown = (e: any) => {
        //let path = editClickedItem;
        if (e.key === "right") {
          var center: any = editClickedItem.bounds.center;
          var baseVec: any = center - e.lastPoint;
          var nowVec: any = center - e.point;
          const angle = nowVec.angle - baseVec.angle;
          if (angle < 0) {
            // editClickedItem.rotate(-45);
            editClickedItem.rotation = -90;
          } else {
            editClickedItem.rotation = 90;
            //editClickedItem.rotate(45);
          }
          count += 1;
          editClickedItem.data.rotation = count;
          if (count === 4) {
            count = 0;
          }
        }
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

        //! 저장 상장 클릭 후  아이템 삭제하기
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
        curTag.remove();
        editClickedItem.remove();
        editClickedItem.bounds.selected = false;
        setEditClickedItem(null);
        setCurTag(null);
        dispatch(setConfirmRes(false));
      } else if (
        !isConfirmRes &&
        editClickedItem &&
        !editClickedItem.bounds.selected
      ) {
        //  editClickedItem.bounds.selected = false;
        setEditClickedItem(null);
      }
    }

    setCount(count + 1);
  }, [
    saveSpace,
    editClickedItem,
    userGiftList,
    isOpenTrash,
    isOpenSave,
    isConfirmRes,
  ]);

  //! space에 저장된 선물 불러오기
  function importSvg() {
    if (match.length <= spaceGiftLists.length) {
      spaceGiftLists.forEach((gift: any) => {
        const svgAttr = JSON.parse(gift.svgAttr);
        Paper.project.importSVG(gift.svg, {
          onLoad: function (item: any) {
            let obj = { id: item.id, gift: gift };
            match.push(obj);
            item.data.idx = gift.idx;
            item.position = new Paper.Point(svgAttr.x, svgAttr.y);

            if (item.firstChild.size._width < 200) {
              item.scale(1.5);
            } else {
              item.scale(0.15);
            }
            // //! text
            const pos = new paper.Point(item.position.x, item.position.y - 45);
            const text = new paper.PointText(pos);
            text.justification = "center";
            text.fontWeight = "bold";
            text.fontSize = 15;
            text.fillColor = new paper.Color(1, 1, 1);
            text.shadowOffset = new paper.Point(1, 1);
            text.shadowColor = new paper.Color(0, 0, 0);
            text.content = gift.userFrom;
            text.data.type = "name";
            text.data.id = gift.idx;

            if (!svgAttr.rotation) {
              return;
            }

            const rotateNum = Number(svgAttr.rotation);
            item.data.rotation = rotateNum;
            //! rotate
            // for (let i = 0; i < rotateNum; i++) {
            //  item.rotation(90);
            // }
            item.rotation = 90 * rotateNum;
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

    if (spaceGiftLists.length === 15) {
      Swal.fire({
        icon: "warning",
        title: `더 이상 추가할 수 없습니다.`,
        text: "최대 15개까지 SPACE에 저장할 수 있습니다.",
        timer: 3000,
        timerProgressBar: true,
        confirmButtonText: "알겠어요",
      });
      return;
    }
    // drag시 어떤   target을 잡았는지 찾기
    const targetId = e.dataTransfer.getData("id");

    //dropGift는 상태가  new, storage이다.
    // new or storage list에서  targetId와 같은건 삭제한다.
    // const filteredNew = dropNewGift.filter((el: any) => {
    //   return el.idx !== Number(targetId);
    // });

    // const filteredStorage = dropStorage.filter((el: any) => {
    //   return el.idx !== Number(targetId);
    // });

    //dropStorage;

    // newGiftList에서  targetId와 같은걸 찾는다. 찾은 후 해당  svg를 캔버스에 붙인다
    const targetItem = userGiftList.filter((el: any) => {
      return el.idx === Number(targetId);
    });

    const x = e.clientX - 320;
    const y = e.clientY - 100;
    const targetSvg = targetItem[0].svg;

    //! svg 속성 값 바꾸기
    let svgAttr = JSON.parse(targetItem[0].svgAttr);
    svgAttr.x = x;
    svgAttr.y = y;
    svgAttr.rotation = 0;
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

        match.push(obj);
        item.position = new Paper.Point(x, y);
        item.data.idx = targetItem[0].idx;
        if (item.firstChild.size._width < 200) {
          item.scale(1.5);
        } else {
          item.scale(0.15);
        }

        // //! text
        const pos = new paper.Point(item.position.x, item.position.y - 45);
        //  pos could really be anything here
        const text = new paper.PointText(pos);
        text.justification = "center";
        text.fontWeight = "bold";
        text.fontSize = 15;
        text.fillColor = new paper.Color(1, 1, 1);
        text.shadowOffset = new paper.Point(1, 1);
        text.shadowColor = new paper.Color(0, 0, 0);
        text.content = targetItem[0].userFrom;
        text.data.type = "name";
        text.data.id = targetItem[0].idx;

        //  dispatch(setStorageGift(filteredStorage));
        // dispatch(setNewGift(filteredNew));

        changeGift(chageData).then(async (res) => {
          if (res.status === 200) {
            const filteredList = await res.data.filter(
              (el: any) => el.status === "storage"
            );
            const filteredNew = await res.data.filter(
              (el: any) => el.status === "new"
            );
            const filteredSpace = await res.data.filter(
              (el: any) => el.status === "space"
            );

            dispatch(setStorageGift(filteredList));
            dispatch(setNewGift(filteredNew));
            dispatch(setSpaceGift(filteredSpace));
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

  //gift random handler
  const giftRandomHandler = () => {
    Paper.project.activeLayer.children.forEach((el) => {
      const randomX = Math.floor(Math.random() * 1090) + 65;

      const randomY = Math.floor(Math.random() * (700 - 65) + 65);

      if (el.data.type !== "name") {
        el.position.x = randomX;
        el.position.y = randomY;
      }
    });
    dispatch(setIsRandom(false));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function saveSpace12() {
    dispatch(setIsOpenTrash(false));
    dispatch(setIsOpenSave(false));
    //! 1. match 와 activeLayer의 children에서 동일한 id를 찾고 포지션을 비교한다.

    let activeLayer: paper.Item[] = [];
    Paper.project.activeLayer.children.forEach((el) => {
      activeLayer.push(el);
    });
    const MoveArr: any = [];

    match.forEach((el: any) => {
      activeLayer.forEach((layer) => {
        if (el.id === layer.id) {
          const svgAttr = JSON.parse(el.gift.svgAttr);

          if (
            svgAttr.x !== layer.position.x ||
            svgAttr.y !== layer.position.y ||
            svgAttr.rotation !== layer.data.rotation
          ) {
            const newPosition = {
              x: layer.position.x,
              y: layer.position.y,
              rotation: layer.data.rotation,
            };
            let data = {
              idx: layer.data.idx,
              svgAttr: JSON.stringify(newPosition),
              userTo: localStorage.getItem("id"),
            };
            MoveArr.push(data);
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

          // 요 포지션은 해당 아이템의 포지션 으로 바꿔준다.
        }
      });
    });
    if (!MoveArr.length) {
      return;
    } else {
      changeGiftPosition(MoveArr).then((res) => {
        if (res.status === 200) {
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
