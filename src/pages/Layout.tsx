import styled from "styled-components";
import Header from "../components/Header";

interface Props {
  children: any;
  title?: string;
}

export default function Layout({ children, title }: Props) {
  return (
    <MainContainer>
      <Header title={title} />
      <ChildrenDiv>{children}</ChildrenDiv>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  /* background-image: url("https://i.imgur.com/J8Wn1dk.png");
  background-position: center;
  background-size: cover; */
  /* min-height: 100vh; */
`;

const ChildrenDiv = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
