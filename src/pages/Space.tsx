import styled from "styled-components";
import Paper from "paper";
import { useEffect, useRef } from "react";
import { getGift } from "../apis/giftApi";
import axios from "axios";

export const MainDiv = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  background: #f6f6f6;
`;

export default function Space() {
  const canvasRef = useRef(null);

  const draw = () => {
    let myPath: any;

    Paper.view.onMouseDown = () => {
      myPath = new Paper.Path();
      myPath.strokeColor = "black";
      myPath.strokeWidth = 3;
    };

    Paper.view.onMouseDrag = (event: any) => {
      myPath.add(event.point);
    };
  };

  useEffect(() => {
    // axios.get("엔드포인트", {헤더}, {바디}).then(....)
    getGift().then();
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      Paper.setup(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <MainDiv>
      <Canvas ref={canvasRef}></Canvas>
    </MainDiv>
  );
}
