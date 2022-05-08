import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { isThemaModal } from "../../redux/actions/index";

export const ModalBackground = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
`;

export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 500px;
  padding: 2rem 1rem 2rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background-color: #efefef;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  @media screen and (max-width: 480px) {
    width: 70%;
  }
`;

export const ImgBox = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;
export const Img = styled.div`
  width: 150px;
  height: 160px;
  background: red;
  margin: 0 6px 12px 6px;
  border-radius: 3px;
`;

export const SelectImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SelectInput = styled.input``;

export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const SaveBtn = styled.button`
  margin: 2px;
`;

export const CloseBtn = styled.button`
  margin: 2px;
`;

export default function Background() {
  const dispatch = useDispatch();
  const [checkedItem, setCheckedItem] = useState<Array<any>>([]);

  const backImg = [
    { id: 1, url: "url1" },
    { id: 2, url: "url2" },
    { id: 3, url: "url3" },
  ];

  const checkedItemHandler = (isCheckd: boolean, item: string) => {
    if (isCheckd) {
      setCheckedItem([item]);
    } else {
      setCheckedItem(checkedItem.filter((el) => el !== item));
    }
  };

  const changeThemaHandler = () => {
    dispatch(isThemaModal(false));
  };

  return (
    <ModalBackground>
      <ModalView>
        <ImgBox>
          {backImg.map((img, idx) => {
            return (
              <SelectImg>
                <Img key="idx">{img.url}</Img>
                <SelectInput
                  type="checkbox"
                  value={img.url}
                  onChange={(e) =>
                    checkedItemHandler(e.target.checked, e.target.value)
                  }
                  checked={checkedItem.includes(img.url) ? true : false}
                ></SelectInput>
              </SelectImg>
            );
          })}
        </ImgBox>
        {checkedItem}
        <BtnBox>
          <SaveBtn>저장</SaveBtn>
          <CloseBtn onClick={changeThemaHandler}> 닫기</CloseBtn>
        </BtnBox>
      </ModalView>
    </ModalBackground>
  );
}
