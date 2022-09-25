import styled from "styled-components";
import Paper from "paper";
import { DragEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Background from "./Background";
import Swal from "sweetalert2";
import {
  setNewGift,
  setSpaceGift,
  setStorageGift,
} from "../../redux/reducers/spaceReducer";
import { changeGiftPosition, updateGift } from "../../apis/giftApi";
import NewGiftIcon from "./newGift/NewGiftIcon";
import GiftModal from "../giftList/GiftModal";
import { getAllItems } from "../../apis/itemApi";

export default function Canvas({ canEditSpace }: any) {
  const dispatch = useDispatch();

  const [isOpenGift, setIsOpenGift] = useState(false);
  const [curTag, setCurTag] = useState<any>();
  const [match, setMatch] = useState<any>([]);
  const [editClickedItem, setEditClickedItem] = useState<any>();
  const [selected, setSelected] = useState<any>();
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  const userGiftList = useSelector((state: any) => state.spaceReducer.myGift);
  const userInfo = useSelector((state: any) => state.spaceReducer.userInfo);
  const spaceGiftLists = useSelector(
    (state: any) => state.spaceReducer.spaceGiftList
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

    getAllItems().then((res) => {
      if (res.data.items) {
        const defaultItem = res.data.items.find((el: any) => {
          return el.type === "default";
        });
        if (defaultItem) {
          Paper.project.importSVG(defaultItem.data, {
            expandShapes: true,

            onLoad: function (item: any) {
              item.position = new Paper.Point(921, 192);
              // item.data.id = svgItem.id;
              item.scale(0.2);
              item.onMouseEnter = (e: any) => {
                console.log("진입!");
              };
            },
          });
        }
      }
    });

    if (spaceGiftLists.length) {
      spaceGiftLists.forEach((gift: any) => {
        const svgAttr = gift.svgAttr;
        handleImportSVG(gift, svgAttr.x, svgAttr.y, "");
      });
    }
  }, []);

  useEffect(() => {
    tool = new paper.Tool();
    tool.activate();

    const clearBoundingBox = () => {
      Paper.project.activeLayer.children.forEach((el) => {
        if (el.bounds.selected) {
          el.onMouseDrag = null;
          el.bounds.selected = false;
        }
      });
      if (editClickedItem) {
        setEditClickedItem(null);
      }
    };

    if (!canEditSpace) {
      clearBoundingBox();
    }

    //클릭 이벤트 핸들러
    Paper.view.onClick = (e: any) => {
      if (canEditSpace) {
        const selectedItem = Paper.project.activeLayer.children.find((el) =>
          el.contains(e.point)
        );

        const currentItem = match?.find(
          (el: any) => el.id === selectedItem?.id
        );

        let nameTag: any;
        if (currentItem) {
          nameTag = Paper.project.activeLayer.children
            .filter((el) => el.data.type === "name")
            .find((el) => el.data.id === currentItem.gift.id);
        }

        if (nameTag) {
          setCurTag(nameTag);
        }

        if (selectedItem && selectedItem.data.type !== "name" && nameTag) {
          clearBoundingBox();
          setEditClickedItem(selectedItem);
          selectedItem.bounds.selected = true;
          selectedItem.onMouseDrag = (e: any) => {
            selectedItem.position.x += e.delta.x;
            selectedItem.position.y += e.delta.y;
            nameTag.position.x += e.delta.x;
            nameTag.position.y += e.delta.y;
          };

          const changeData = {
            id: currentItem.gift.id,
            svgAttr: {
              x: selectedItem.position.x,
              y: selectedItem.position.y,
              rotate: 0,
            },
          };
          handleUpdateGift(changeData);
        } else {
          clearBoundingBox();
        }
      }
    };

    Paper.view.onMouseDown = (e: any) => {
      if (canEditSpace) {
        console.log("마우스 다운", e);
        if (
          e.point.x <= 940 &&
          e.point.x >= 900 &&
          e.point.y <= 232 &&
          e.point.y >= 152
        ) {
          console.log("쓰레기통", editClickedItem);
        }
      }
    };

    Paper.view.onMouseMove = (e: any) => {
      if (canEditSpace) {
        // console.log("마우스 다운", e);
        if (
          e.point.x <= 940 &&
          e.point.x >= 900 &&
          e.point.y <= 232 &&
          e.point.y >= 152
        ) {
          console.log("쓰레기통", editClickedItem);
          // Swal.fire({
          //   title: "정말 삭제하시겠습니까?",
          // }).then((result) => {
          //   if (result.isConfirmed) {
          //     console.log("삭제");
          //   }
          // });
        }
      }
    };
  }, [canEditSpace]);

  const handleImportSVG = (
    svgItem: any,
    x: number,
    y: number,
    type: string
  ) => {
    const svg = svgItem.svg.data;

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
        text.content = `from. ${svgItem.userFrom.nickname}`;
        text.data.type = "name";
        text.data.id = svgItem.id;
      },
    });

    //todo 로직개선필요(조건부로 업데이트)
    if (type === "toSpace") {
      const changeData = {
        id: svgItem.id,
        status: "space",
      };
      handleUpdateGift(changeData);
    }
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

  const handleUpdateGift = async (changeData: any) => {
    const {
      data: { ok, updatedGift },
    } = await updateGift(changeData);

    if (ok) {
      const storageGiftList = updatedGift.filter(
        (el: any) => el.status === "storage"
      );
      const newGiftList = updatedGift.filter((el: any) => el.status === "new");
      const spaceGiftList = updatedGift.filter(
        (el: any) => el.status === "space"
      );

      dispatch(setStorageGift(storageGiftList));
      dispatch(setNewGift(newGiftList));
      dispatch(setSpaceGift(spaceGiftList));
    }
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

    handleImportSVG(targetItem, x, y, "toSpace");
  };

  //!쓰임새가 있음
  const dragOverHandler = (e: DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  function handleSaveSpace() {
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
      )}
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

const WasteCanBox = styled.img`
  margin-left: 420px;
  top: 240px;
  width: 100px;
  position: fixed;
`;
