import styled from "styled-components";
import Paper from "paper";
import { DragEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTheme, newGiftList } from "../../redux/actions/index";
import Background from "./Background";
import { themeList } from "../../utils/themaList";

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

export default function Canvas() {
  const dispatch = useDispatch();
  const themeModal = useSelector(
    (state: any) => state.spaceReducer.isThemeModal.boolean
  );
  const myInfo = useSelector((state: any) => state.spaceReducer.userInfo);
  const newGiftLists = useSelector(
    (state: any) => state.spaceReducer.newGiftList
  );

  const [newList, setNewList] = useState(newGiftLists);
  const [selected, setSelected] = useState(null);
  const draw = () => {
    let myPath: any;

    Paper.view.onMouseDown = () => {
      myPath = new Paper.Path();
      myPath.strokeColor = "yellow";
      myPath.strokeWidth = 3;
    };

    // Paper.view.onMouseDrag = (event: any) => {
    //   myPath.add(event.point);
    // };
  };

  useEffect(() => {
    console.log("theme updated");
    dispatch(newGiftList(newList));
  }, [dispatch, myInfo, newList]);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);
    draw();
    async function fetchData() {
      // You can await here
      dispatch(await editTheme(themeList[0].url));
      // ...
    }
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const canvasRef = useRef(null);

  //! 변수
  let segment: any;
  let path: any;
  let selectionRectangle: any;
  let movePath = false;

  //drop
  const dropHandler = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // drag시 어떤   target을 잡았는지 찾기
    const targetId = e.dataTransfer.getData("id");
    const a = newList.filter((el: any) => {
      return el.id !== Number(targetId);
    });
    setNewList(a);
    console.log("drop", newList, "new");

    // newGiftList에서  targetId와 같은걸 찾는다. 찾은 후 해당  svg를 캔버스에 붙인다
    // newGiftList에서 targetId와 같은건 삭제한다.
    const targetItem = newList.filter((el: any) => {
      return el.id === Number(targetId);
    });
    console.log("drop", targetItem, newList, targetId);
    const x = e.clientX - 150;
    const y = e.clientY - 100;
    const targetSvg = targetItem[0].url;
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

        item.position = new Paper.Point(x, y);
        if (item.firstChild.size._width < 500) {
          item.scale(1.5);
        } else {
          item.scale(0.15);
        }

        /*/drag event
        item.onMouseDrag = function (e: { delta: any }) {
          item.position.x += e.delta.x;
          item.position.y += e.delta.y;
        };

        item.onMouseDown = function (e: { delta: any }) {
          item.bounds.selected = true;
        };*/

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
        //error
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
    <CanvasBox>
      <CanvasArea
        ref={canvasRef}
        id="canvas"
        color={myInfo.theme}
        draggable
        onDrop={(e: any) => dropHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
      ></CanvasArea>
      {themeModal ? <Background /> : null}
    </CanvasBox>
  );
}
