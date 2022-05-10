import styled from "styled-components";
import Paper from "paper";
import { DragEvent, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  editThema,
  isThemaModal,
  newGiftList,
} from "../../redux/actions/index";
import Background from "./Background";
import { themaList } from "../../utils/themaList";

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
  const themaModal = useSelector(
    (state: any) => state.spaceReducer.isThemaModal.boolean
  );
  const myThema = useSelector((state: any) => state.spaceReducer.myThema.thema);
  const newGiftLists = useSelector(
    (state: any) => state.spaceReducer.newGiftList
  );

  const [newList, setNewList] = useState(newGiftLists);

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
    console.log("thema updated");
    dispatch(newGiftList(newList));
  }, [dispatch, myThema, newList]);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);
    draw();
    dispatch(editThema(themaList[0].url));
  }, [dispatch]);

  const canvasRef = useRef(null);

  //change Thema
  const changeThemaHandler = () => {
    dispatch(isThemaModal(true));
  };

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
        console.log("-===========", item.bounds);
        var segment: any;
        var path: any;
        item.onMouseDown = function (e: any) {
          console.log("eeeee", e.point, Paper.project);
          segment = path = null;
          const hitResult = Paper.project.hitTest(e.point, hitOptions);

          console.log(hitResult, "hit------------", "----", e.modifiers);
          if (!hitResult) {
            return;
          }
          console.log("tooldown type", hitResult.type);
          if (hitResult) {
            path = hitResult.item;
            if (hitResult.type === "fill") {
              item.bounds.selected = true;
              path.data.state = "moving";
            }
            if (hitResult && hitResult.type === "segment") {
              path = Paper.project.selectedItems[0];
              segment = hitResult.segment;
              console.log("path", path, Paper.project);
              if (e.modifiers.control) {
                path.data.state = "rotating";
              } else {
                path.data.state = "resizing";
                path.data.bounds = path.bounds.clone();
                path.data.scaleBase = e.point - path.bounds.center;
              }
              console.log(path.data);
            }
          }
        };
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
            //  adjustBounds(path);
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
        color={myThema}
        draggable
        onDrop={(e: any) => dropHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
      ></CanvasArea>
      {themaModal ? <Background /> : null}
      <button onClick={changeThemaHandler}>테마수정</button>
      <button>아바타 수정</button>
      <button>공간 수정</button>
    </CanvasBox>
  );
}
