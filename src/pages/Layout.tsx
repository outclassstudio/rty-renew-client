import styled from "styled-components";
import Header from "../components/Header";

const MainContainer = styled.div``;
const ChildrenDiv = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

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
