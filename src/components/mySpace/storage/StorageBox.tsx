import styled from "styled-components";
import StorageItem from "./StorageItem";

export function StorageBox(props: any) {
  const storageList = props.storageList;

  return (
    <NewGiftContainer>
      <h4>Storage Component</h4>
      <h3>Storage</h3>
      <ItemContainer>
        {storageList.map((item: any, idx: number) => {
          return <StorageItem item={item} key={idx} />;
        })}
      </ItemContainer>
    </NewGiftContainer>
  );
}

export const NewGiftContainer = styled.div`
  margin: 50px 20px 0;
  width: 200px;
  height: 720px;
  background-color: #f9f9f9;
  border-radius: 10px;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
  z-index: 0;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
