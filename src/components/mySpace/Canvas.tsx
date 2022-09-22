import styled from "styled-components";
import Paper from "paper";
import { DragEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Background from "./Background";
import Swal from "sweetalert2";
import {
  setConfirmModal,
  setConfirmRes,
  setIsOpenSave,
  setIsOpenTrash,
  setNewGift,
  setSpaceGift,
  setStorageGift,
} from "../../redux/reducers/spaceReducer";
import { changeGiftPosition, updateGift } from "../../apis/giftApi";
import { WastebasketIcon } from "./wastebasket/WastebasketIcon";
import { Storage } from "./storage/Storage";
import NewGiftIcon from "./newGift/NewGiftIcon";
import { ConfirmModal } from "../ConfirmModal";
import { LOCALSTORAGE_ID } from "../../constants";
import GiftModal from "../giftList/GiftModal";

export default function Canvas({ canSaveSpace, editSpace: isEditSpace }: any) {
  const dispatch = useDispatch();

  const [msg, setMsg] = useState<string>("");
  const [changeData, setChageData] = useState<any>();
  const [isOpenGift, setIsOpenGift] = useState(false);
  const [curTag, setCurTag] = useState<any>();
  const [match, setMatch] = useState<any>([]);
  const [editClickedItem, setEditClickedItem] = useState<any>();
  const [selected, setSelected] = useState<any>();
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  const userGiftList = useSelector((state: any) => state.spaceReducer.myGift);
  const userInfo = useSelector((state: any) => state.spaceReducer.userInfo);
  const isOpenTrash = useSelector(
    (state: any) => state.spaceReducer.isOpenTrash
  );
  const isOpenSave = useSelector((state: any) => state.spaceReducer.isOpenSave);
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

  const canvasRef = useRef(null);
  let tool: paper.Tool;

  useLayoutEffect(() => {
    Paper.install(window);
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);

    let rect = canvas.getBoundingClientRect();
    setCurrentPosition({
      x: rect.left,
      y: rect.top,
    });

    openGiftHandler();

    //DB의 SVG로드
    if (match.length <= spaceGiftLists.length) {
      spaceGiftLists.forEach((gift: any) => {
        const svgAttr = gift.svgAttr;
        handleImportSVG(gift, svgAttr.x, svgAttr.y);
      });
    }
  }, []);

  // useEffect(() => {
  //   if (saveSpace && count !== 1) {
  //     saveSpace12();
  //   }
  // }, [saveSpace, count, saveSpace12]);

  useEffect(() => {
    tool = new paper.Tool();
    tool.activate();

    //클릭 이벤트 핸들러
    Paper.view.onClick = (e: any) => {
      if (editClickedItem) {
        editClickedItem.bounds.selected = false;
      }

      const test = Paper.project.activeLayer.children.find((el) =>
        el.contains(e.point)
      );

      const nameTag = Paper.project.activeLayer.children.find(
        (el) => el.data.id === test?.data.id
      );

      if (nameTag) {
        setCurTag(nameTag);
      }

      if (test && nameTag) {
        //click 한거 idx 랑 같은 text data.id 저장
        if (test.data.type === "name") {
          editClickedItem.onMouseDrag = function abc() {};
          editClickedItem.onDoubleClick = function abc() {};
        } else {
          setEditClickedItem(test);
          test.bounds.selected = true;

          test.onMouseDrag = (e: any) => {
            test.position.x += e.delta.x;
            test.position.y += e.delta.y;
            // nameTag.position.x += e.delta.x;
            // nameTag.position.y += e.delta.y;
          };
        }
      } else {
        Paper.project.activeLayer.children.forEach((el) => {
          if (el.bounds.selected) {
            el.bounds.selected = false;
          }
        });

        setEditClickedItem(null);
      }
    };

    if (canSaveSpace) {
      Paper.project.activeLayer.children.forEach((el) => {
        if (el.data.type === "name") {
          el.visible = true;
        }
      });
      // if (editClickedItem) {
      //   setEditClickedItem(null);
      //   editClickedItem.bounds.selected = false;
      //   editClickedItem.onMouseDrag = function abc() {};
      // }
    } else {
      Paper.project.activeLayer.children.forEach((el) => {
        if (el.data.type === "name") {
          el.visible = false;
          el.bounds.selected = false;
        }
      });

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
  }, [
    canSaveSpace,
    editClickedItem,
    userGiftList,
    isOpenTrash,
    isOpenSave,
    isConfirmRes,
  ]);

  const handleImportSVG = (svgItem: any, x: number, y: number) => {
    const svg = svgItem.svg.data;
    console.log(svgItem);

    Paper.project.importSVG(svg, {
      expandShapes: true,

      onLoad: function (item: any) {
        let obj = { id: item.id, gift: svgItem };
        // setMatch([...match, obj]);
        match.push(obj);
        item.position = new Paper.Point(x, y);
        item.data.id = svgItem.id;
        if (item.firstChild.size._width < 200) {
          item.scale(1.5);
        } else {
          item.scale(0.3);
        }

        //! text
        const pos = new paper.Point(item.position.x, item.position.y - 45);
        const text = new paper.PointText(pos);
        text.justification = "center";
        text.fontWeight = "bold";
        text.fontSize = 15;
        text.fillColor = new paper.Color(1, 1, 1);
        text.shadowOffset = new paper.Point(1, 1);
        text.shadowColor = new paper.Color(0, 0, 0);
        text.content = svgItem.userFrom.nickname;
        text.data.type = "name";
        text.data.id = svgItem.id;

        if (!svgItem.svgAttr.rotation) {
          return;
        }

        const rotateNum = Number(svgItem.svgAttr.rotation);
        item.data.rotation = rotateNum;
        item.rotation = 90 * rotateNum;
      },
    });
  };

  /** gift 클릭시 작동하는 함수 */
  const openGiftHandler = () => {
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
        handleOpenLetter(hitItem.id);
      }
    };
  };

  const handleOpenLetter = (itemid: number) => {
    const item = match.find((el: any) => el.id === itemid);
    setSelected(item.gift);
    setIsOpenGift(true);
  };

  const handleUpdateGift = (changeData: any) => {
    updateGift(changeData).then(async (res) => {
      if (res.data.ok) {
        const storageGiftList = await res.data.filter(
          (el: any) => el.status === "storage"
        );
        const newGiftList = await res.data.filter(
          (el: any) => el.status === "new"
        );
        const spaceGiftList = await res.data.filter(
          (el: any) => el.status === "space"
        );

        dispatch(setStorageGift(storageGiftList));
        dispatch(setNewGift(newGiftList));
        dispatch(setSpaceGift(spaceGiftList));
      }
    });
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

    const x = e.clientX - currentPosition.x;
    const y = e.clientY - currentPosition.y;

    handleImportSVG(targetItem, x, y);
  };

  //!쓰임새가 있음
  const dragOverHandler = (e: DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  function handleSaveSpace() {
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

  const openGiftModal = () => {
    setIsOpenGift((prev) => !prev);
  };

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
      {themeModal && <Background />}
      {isOpenGift && (
        <div onClick={openGiftModal}>
          <GiftModal data={selected} />
        </div>
        // <Gift setIsOpenGift={setIsOpenGift} item={match} id={clickedId} />
      )}
      {/* {isConfirmModal && isOpenTrash && editClickedItem ? (
        <ConfirmModal msg={msg} changeData={changeData} />
      ) : null}
      {isConfirmModal && isOpenSave && editClickedItem ? (
        <ConfirmModal msg={msg} changeData={changeData} />
      ) : null} */}
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
