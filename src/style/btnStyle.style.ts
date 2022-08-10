import styled from "styled-components";

interface Size {
  width?: string;
  height?: string;
  background?: string;
}

export const NormalBtn = styled.button<Size>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background: ${(props) => props.background};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  /* margin: 0 20px; 0px 20px; */
  &.a {
    background: linear-gradient(90deg, #ffca60 0%, #fb834c 58.85%);
  }

  &.b {
    background: linear-gradient(to right, #ec047a 30%, #b22490 100%);
  }

  &.c {
    background: linear-gradient(to right, #45a097 30%, #1b3550 100%);
  }

  :active {
    box-shadow: inset 1px 1px 2px 2px rgba(0, 0, 0, 0.3);
  }
`;
