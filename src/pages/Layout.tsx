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
  /* background-image: url("https://static.vecteezy.com/system/resources/previews/001/910/477/original/flat-colorful-space-with-rocket-background-free-vector.jpg");
  background-position: center;
  background-size: cover; */
`;

const ChildrenDiv = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;
