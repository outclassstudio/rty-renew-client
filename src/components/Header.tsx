import styled from "styled-components";

interface Props {
  title?: string;
}

const HeaderDiv = styled.header`
  height: 50px;
  /* width: 100vw; */
  position: fixed;
  display: flex;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
  /* padding: 10px; */
  background-color: black;
  box-shadow: none;
`;

const HeaderLeft = styled.div`
  width: 200px;
  padding-left: 1rem;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: right;
  width: 200px;
  padding-right: 1rem;
`;

const HeaderCenter = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Header({ title }: Props) {
  return (
    <HeaderDiv>
      <HeaderLeft></HeaderLeft>
      <HeaderCenter>{title}</HeaderCenter>
      <HeaderRight></HeaderRight>
    </HeaderDiv>
  );
}
