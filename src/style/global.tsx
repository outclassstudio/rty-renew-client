import styled, { createGlobalStyle, keyframes } from "styled-components";

export const GlobalStyle = createGlobalStyle`
@font-face {
    font-family: 'Noto Sans KR', sans-serif;
    src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap') format('woff');
    font-weight: 400;
    font-style: normal;
}

  body {
    box-sizing: border-box;
    margin: 0;
    font-family: 'Noto Sans KR', sans-serif;
    /* background: #f6f6f6 */
    // font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
}
`;

const LAYOUT_BREAK_POINT = {
  MOBILE: 768,
  MAC: 1440,
};

const createMediaQuery = (mediaPx: number): string => {
  return `@media(max-width: ${mediaPx}px)`;
};

//미디어쿼리 생성
export const mediaQuery = {
  mobile: createMediaQuery(LAYOUT_BREAK_POINT.MOBILE),
  mac: createMediaQuery(LAYOUT_BREAK_POINT.MAC),
};

//기본컬러
export const baseColor = "#232253";

//페이드 애니메이션
export const fadeAction = keyframes`
  0% {
    opacity:0
  }

  100% {
    opacity: 1;
  }
`;

export const fadeMoveAction = keyframes`
  0% {
    transform: translateY(30px);
    opacity:0
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const fadeMoveAction2 = keyframes`
  0% {
    transform: translateY(30px);
    opacity:0
  }

  30% {
    transform: translateY(30px);
    opacity:0
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

export const fadeExpand = keyframes`
  0% {
    transform: scale(0%);
    opacity:0
  }


  100% {
    transform: scale(100%);
    opacity: 1;
  }
`;

//드롭다운 배경용
export const DropdonwBg = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  z-index: -1;
`;
