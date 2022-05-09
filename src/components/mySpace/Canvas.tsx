import styled from "styled-components";
import Paper from "paper";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editThema, isThemaModal } from "../../redux/actions/index";
import Background from "./Background";
import { themaList } from "../../utils/themaList";
//import Thema1 from "../../assets/images/sky.jpg";

export const CanvasBox = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const CanvasArea = styled.canvas`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.color});
  background-size: 1920px 960px;
  background-repeat: no-repeat;
`;

export default function Canvas() {
  const dispatch = useDispatch();
  const themaModal = useSelector(
    (state: any) => state.spaceReducer.isThemaModal.boolean
  );
  const myThema = useSelector((state: any) => state.spaceReducer.myThema.thema);
  console.log(myThema, "canvasa");

  const draw = () => {
    let myPath: any;

    Paper.view.onMouseDown = () => {
      myPath = new Paper.Path();
      myPath.strokeColor = "yellow";
      myPath.strokeWidth = 3;
    };

    Paper.view.onMouseDrag = (event: any) => {
      myPath.add(event.point);
    };
  };

  useEffect(() => {
    console.log("thema updated");
  }, [myThema]);

  useEffect(() => {
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);
    draw();
    dispatch(editThema(themaList[0].url));
  }, [dispatch]);

  const canvasRef = useRef(null);

  const changeThemaHandler = () => {
    dispatch(isThemaModal(true));
  };

  return (
    <CanvasBox>
      <button onClick={changeThemaHandler}>테마수정</button>
      <CanvasArea ref={canvasRef} id="canvas" color={myThema}></CanvasArea>
      {themaModal ? <Background /> : null}
    </CanvasBox>
  );
}
