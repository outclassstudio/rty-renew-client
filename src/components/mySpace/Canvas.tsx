import styled from "styled-components";
import Paper from "paper";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isThemaModal } from "../../redux/actions/index";
import Background from "./Background";
import Thema1 from "../../assets/images/sky.jpg";

export const CanvasBox = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const CanvasArea = styled.canvas`
  width: 100%;
  height: 100%;
  background-image: url(${Thema1});
  background-size: 1920px 960px;
  background-repeat: no-repeat;
`;

export default function Canvas() {
  const dispatch = useDispatch();
  const themaModal = useSelector(
    (state: any) => state.spaceReducer.isThemaModal.boolean
  );
  //const [isOpen, setIsOpen] = useState<Boolean>(false);

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
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);
    draw();
  }, []);

  const canvasRef = useRef(null);

  const changeThemaHandler = () => {
    dispatch(isThemaModal(true));
  };

  return (
    <CanvasBox>
      <button onClick={changeThemaHandler}>테마수정</button>
      <CanvasArea ref={canvasRef} id="canvas"></CanvasArea>

      {themaModal ? <Background /> : null}
    </CanvasBox>
  );
}
