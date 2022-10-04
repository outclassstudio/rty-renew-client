import styled from "styled-components";
import Paper from "paper";
import { DragEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateGift } from "../../apis/giftApi";
import Background from "./Background";
import NewGiftIcon from "./newGift/NewGiftIcon";
import GiftModal from "../giftList/GiftModal";
import Swal from "sweetalert2";
import { useCallback } from "react";
import { setNewGift } from "../../redux/reducers/spaceReducer";

interface ICanvasProps {
  canEditSpace: boolean;
}

export default function Canvas({ canEditSpace }: ICanvasProps) {
  const dispatch = useDispatch();
  const [isOpenGift, setIsOpenGift] = useState(false);
  const [match, setMatch] = useState<any>([]);
  const [selected, setSelected] = useState<any>();
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });

  const userGiftList = useSelector((state: any) => state.spaceReducer.myGift);
  const userInfo = useSelector((state: any) => state.spaceReducer.userInfo);
  const defaultItem = useSelector(
    (state: any) => state.spaceReducer.defaultItem
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

    if (defaultItem) {
      const selected = defaultItem.find((el: Item.singleItemDTO) => {
        return el.type === "default";
      });
      if (selected) {
        Paper.project.importSVG(selected.data, {
          expandShapes: true,

          onLoad: function (item: paper.Item) {
            item.position = new Paper.Point(921, 192);
            item.data.id = defaultItem.id;
            item.data.type = "default";
            item.scale(0.2);
            item.visible = false;
          },
        });
      }
    }

    //DB의 SVG로드
    if (userGiftList) {
      const spaceGiftLists = userGiftList.filter(
        (item: { status: string }) => item.status === "space"
      );
      spaceGiftLists?.forEach((gift: Gift.singleGiftDTO) => {
        const svgAttr = gift.svgAttr;
        if (svgAttr) {
          handleImportSVG(gift, svgAttr.x, svgAttr.y, "");
        }
      });
    }
  }, [userGiftList]);

  let currentGift: paper.Item;
  let currentNameTag: paper.Item;

  useEffect(() => {
    tool = new paper.Tool();
    tool.activate();

    const trashCan = Paper.project.activeLayer.children.find(
      (el) => el.data.type === "default"
    );

    const filtered = Paper.project.activeLayer.children.filter(
      (el) => el.data.type !== "default"
    );

    if (!canEditSpace) {
      clearBoundingBox();
      Paper.view.onClick = null;
      Paper.view.onMouseEnter = null;
      if (trashCan) {
        trashCan.visible = false;
      }
    } else {
      if (trashCan) {
        trashCan.visible = true;
      }

      //클릭 이벤트 핸들러
      Paper.view.onClick = (e: paper.MouseEvent) => {
        const selectedItem = filtered.find((el) => el.contains(e.point));

        if (selectedItem) {
          currentGift = selectedItem;
        }

        const currentItem = match?.find(
          (el: any) => el.id === selectedItem?.id
        );

        let nameTag: paper.Item | undefined;
        if (currentItem) {
          nameTag = Paper.project.activeLayer.children
            .filter((el) => el.data.type === "name")
            .find((el) => el.data.id === currentItem.gift.id);
        }

        if (nameTag) {
          currentNameTag = nameTag;
        }

        if (selectedItem && selectedItem.data.type !== "name" && nameTag) {
          clearBoundingBox();
          selectedItem.bounds.selected = true;
          selectedItem.onMouseDrag = (e: paper.MouseEvent) => {
            selectedItem.position.x += e.delta.x;
            selectedItem.position.y += e.delta.y;
            nameTag && (nameTag.position.x += e.delta.x);
            nameTag && (nameTag.position.y += e.delta.y);
          };

          const changeData = {
            id: currentItem.gift.id,
            svgAttr: {
              x: selectedItem.position.x,
              y: selectedItem.position.y,
              rotate: 0,
            },
          };
          //todo lodash 적용
          handleUpdateGift(changeData);
        } else {
          clearBoundingBox();
        }
      };

      Paper.view.onMouseEnter = (e: paper.MouseEvent) => {
        if (
          currentGift &&
          e.point.x <= 970 &&
          e.point.x >= 870 &&
          e.point.y <= 242 &&
          e.point.y >= 142
        ) {
          Swal.fire({
            title: "정말 삭제하시겠습니까?",
            text: "삭제한 선물은 복구할 수 없어요",
            confirmButtonText: "네ㅠㅠ",
            showDenyButton: true,
            denyButtonText: "아니요!",
          }).then((result) => {
            if (result.isConfirmed) {
              currentGift.remove();
              currentNameTag.remove();
            } else {
              currentGift.position.x -= 100;
              currentNameTag.position.x -= 100;

              const changeData = {
                id: currentGift.data.id,
                svgAttr: {
                  x: currentGift.position.x,
                  y: currentGift.position.y,
                  rotate: 0,
                },
              };
              handleUpdateGift(changeData);
            }
          });
        }
      };
    }
  }, [canEditSpace]);

  const clearBoundingBox = () => {
    Paper.project.activeLayer.children.forEach((el) => {
      if (el.bounds.selected) {
        el.onMouseDrag = null;
        el.bounds.selected = false;
      }
    });
  };

  //!gift 타입 재정의해야함
  const handleImportSVG = useCallback(
    (svgItem: any, x: number, y: number, type: string) => {
      const svg = svgItem.svg.data;

      Paper.project.importSVG(svg, {
        expandShapes: true,

        //!왜 타입에서 size를 못찾는지
        onLoad: function (item: any) {
          let obj = { id: item.id, gift: svgItem };
          // setMatch([...match, obj]);
          match.push(obj);
          item.position = new Paper.Point(x, y);
          item.data.type = "gift";
          item.data.id = svgItem.id;
          if (item.firstChild.size.width < 200) {
            item.scale(1.5);
          } else {
            item.scale(0.3);
          }

          // text
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
          svgAttr: { x, y, rotate: 0 },
          status: "space",
        };
        handleUpdateGift(changeData, "toSpace");
      }
    },
    []
  );

  //! 드래그앤드랍시 작동하는 함수
  const dropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const targetId = e.dataTransfer.getData("id");
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

  /** gift 클릭시 작동하는 함수 */
  const openGiftHandler = useCallback(() => {
    Paper.view.onDoubleClick = (e: paper.MouseEvent) => {
      const hitItem = Paper.project.activeLayer.children.find((el) =>
        el.contains(e.point)
      );

      if (hitItem?.data.type === "name") {
        hitItem.onMouseDrag = null;
        hitItem.onDoubleClick = null;
        return;
      }
      if (hitItem) {
        // handleOpenLetter(hitItem.id);
        const item = match.find((el: any) => el.id === hitItem.id);
        setSelected(item.gift);
        setIsOpenGift(true);
      }
    };
  }, []);

  const handleUpdateGift = async (
    changeData: Gift.IChangeData,
    type?: string
  ) => {
    const {
      data: { updatedGift },
    } = await updateGift(changeData);
    if (updatedGift && type === "toSpace") {
      const newGift = updatedGift.filter((el: any) => el.status === "new");
      dispatch(setNewGift(newGift));
    }
  };

  const openGiftModal = useCallback(() => {
    setIsOpenGift((prev) => !prev);
  }, [isOpenGift]);

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
