import styled from "styled-components";
import Paper from "paper";
import { DragEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Gift } from "./gift/Gift";
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
import { changeGiftPosition, updateGift } from "../../apis/giftApi";
import { WastebasketIcon } from "./wastebasket/WastebasketIcon";
import { Storage } from "./storage/Storage";
import NewGiftIcon from "./newGift/NewGiftIcon";
import { ConfirmModal } from "../ConfirmModal";
import { FlexDiv } from "../../style/utility.style";
import { LOCALSTORAGE_ID } from "../../constants";

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
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  const canvasRef = useRef(null);
  let tool: paper.Tool;
  useEffect(() => {
    Paper.install(window);
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);

    let rect = canvas.getBoundingClientRect();
    setCurrentPosition({
      x: rect.left,
      y: rect.top,
    });
    console.log("현재포지션", currentPosition);

    const DropNewList = userGiftList?.filter(
      (item: any) => item.status === "new"
    );
    setNewDropGift(DropNewList);

    const DropStorageGfit = userGiftList?.filter(
      (item: any) => item.status === "storage"
    );
    setNewDropGift(DropStorageGfit);
    //canvas에 import 하가

    like();

    if (spaceGiftList && spaceGiftList.length !== 0) {
      importSvg();
    }
  }, []);

  useEffect(() => {
    if (saveSpace && count !== 1) {
      saveSpace12();
    }
  }, [saveSpace, count, saveSpace12]);

  //!삭제할것임
  // useEffect(() => {
  //   if (isRandom) {
  //     giftRandomHandler();
  //   }
  // }, [isRandom]);

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
        if (e.key === "right") {
          var center: any = editClickedItem.bounds.center;
          var baseVec: any = center - e.lastPoint;
          var nowVec: any = center - e.point;
          const angle = nowVec.angle - baseVec.angle;
          if (angle < 0) {
            editClickedItem.rotation = -90;
          } else {
            editClickedItem.rotation = 90;
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
          userTo: localStorage.getItem(LOCALSTORAGE_ID),
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
        const svgAttr = gift.svgAttr;
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

  //! 드래그앤드랍시 작동하는 함수
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

    // newGiftList에서  targetId와 같은걸 찾는다. 찾은 후 해당  svg를 캔버스에 붙인다
    const targetItem = userGiftList.find(
      (el: any) => el.id === Number(targetId)
    );

    console.log("변했는지 확인", currentPosition);

    const x = e.clientX - currentPosition.x;
    const y = e.clientY - currentPosition.y;
    const targetSvg = targetItem.svg.data;
    console.log(canvasRef.current, e, x, y, Paper.project);

    //! svg 속성 값 바꾸기
    // let svgAttr = targetItem[0].svgAttr;
    // svgAttr.x = x;
    // svgAttr.y = y;
    // svgAttr.rotation = 0;
    // // svgAttr = JSON.stringify(svgAttr);
    // const chageData = {
    //   id: targetItem[0].id,
    //   svgAttr,
    //   status: "space",
    //   userTo: window.localStorage.getItem("id"),
    // };

    //찾은  item canvas에 붙이기
    Paper.project.importSVG(targetSvg, {
      expandShapes: true,

      onLoad: function (item: any) {
        let obj = { id: item.id, gift: targetItem };
        match.push(obj);
        item.position = new Paper.Point(x, y);
        item.data.id = targetItem.id;
        if (item.firstChild.size._width < 200) {
          item.scale(1.5);
        } else {
          item.scale(0.5);
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
        text.content = targetItem.userFrom.nickname;
        text.data.type = "name";
        text.data.id = targetItem.id;

        // updateGift(chageData).then(async (res) => {
        //   if (res.status === 200) {
        //     const filteredList = await res.data.filter(
        //       (el: any) => el.status === "storage"
        //     );
        //     const filteredNew = await res.data.filter(
        //       (el: any) => el.status === "new"
        //     );
        //     const filteredSpace = await res.data.filter(
        //       (el: any) => el.status === "space"
        //     );

        //     dispatch(setStorageGift(filteredList));
        //     dispatch(setNewGift(filteredNew));
        //     dispatch(setSpaceGift(filteredSpace));
        //   }
        // });
      },
    });
  };

  //!쓰임새가 없음
  const dragOverHandler = (e: DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  //!삭제할 것임
  //gift random handler
  // const giftRandomHandler = () => {
  //   Paper.project.activeLayer.children.forEach((el) => {
  //     const randomX = Math.floor(Math.random() * 1090) + 65;
  //     const randomY = Math.floor(Math.random() * (700 - 65) + 65);

  //     if (el.data.type !== "name") {
  //       el.position.x = randomX;
  //       el.position.y = randomY;
  //     }
  //   });
  //   dispatch(setIsRandom(false));
  // };

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
          const svgAttr = el.gift.svgAttr;

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
              const position = el.svgAttr;
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
        color={userInfo.theme.data}
        draggable
        onDrop={(e: any) => dropHandler(e)}
        onDragOver={dragOverHandler}
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
    </>
  );
}

const CanvasArea = styled.canvas`
  width: 1008px;
  height: 567px;
  border-radius: 10px;
  background-image: url(${(props) => props.color});
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: rgba(0, 0, 0, 0.6) 0px 0px 20px 0px;
`;
