import styled from "styled-components";
import Paper from "paper";
import { useEffect, useRef } from "react";

export const CanvasBox = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const CanvasArea = styled.canvas`
  width: 100%;
  height: 100%;
  background: black;
`;

export default function Canvas() {
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

    // Paper.view.draw();
  };

  useEffect(() => {
    const canvas: any = canvasRef.current;
    Paper.setup(canvas);
    draw();
  }, []);

  const canvasRef = useRef(null);
  return (
    <CanvasBox>
      <CanvasArea ref={canvasRef} id="canvas"></CanvasArea>
    </CanvasBox>
  );
}
