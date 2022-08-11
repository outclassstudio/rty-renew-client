import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTheme } from "../../apis/userApi";
import { setModalOpen, setUserInfo } from "../../redux/reducers/spaceReducer";
import { colorSet, fadeAction, fadeExpand } from "../../style/global";
import NumberCarousel from "../common/NumberCarousel";
import { getMyItems } from "../../apis/itemApi";

export default function Background() {
  const dispatch = useDispatch();
  const [checkedItem, setCheckedItem] = useState<Array<any>>([]);
  const [themeList, setThemeList] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(12);

  useEffect(() => {
    //!타입수정필요
    let myTheme: any;
    getMyItems().then((res) => {
      if (res.data.myItems) {
        myTheme = res.data.myItems.filter((el) => el.type === "theme");
      }
      setThemeList(myTheme);
    });
  }, []);

  const checkedItemHandler = (isCheckd: boolean, item: string) => {
    if (isCheckd) {
      setCheckedItem([Number(item)]);
    } else {
      setCheckedItem(checkedItem.filter((el) => el !== item));
    }
  };

  const changeThemeHandler = async () => {
    if (checkedItem.length !== 0) {
      changeTheme(checkedItem[0]).then((res) => {
        let info = res.data;
        dispatch(setUserInfo(info));
      });
      dispatch(setModalOpen(false));
    }
  };

  const closeThemeHandler = () => {
    dispatch(setModalOpen(false));
  };

  //번호선택 및 범위지정
  const handleSetPage = (page: number) => {
    setStart((page - 1) * 12);
    setEnd(page * 12);
    setPage(page);
  };

  return (
    <ModalBackground>
      <ModalView>
        <ModalTitle>🎨테마를 선택해주세요</ModalTitle>
        {themeList.length > 4 ? (
          <NumberCarousel
            giftListData={themeList}
            page={page}
            handleSetPage={handleSetPage}
            color={"white"}
            pageLimit={12}
          />
        ) : null}

        <ImgContainer>
          {themeList.slice(start, end).map((theme, idx) => {
            return (
              <SelectImg key={idx}>
                <ImgBox>
                  <Img src={theme.data} alt="theme" />
                </ImgBox>
                <ImgName>{theme.name}</ImgName>
                <SelectInput
                  type="checkbox"
                  value={theme.idx}
                  onChange={(e) =>
                    checkedItemHandler(e.target.checked, e.target.value)
                  }
                  checked={checkedItem.includes(theme.idx) ? true : false}
                ></SelectInput>
              </SelectImg>
            );
          })}
        </ImgContainer>
        <BtnBox>
          <SaveBtn onClick={changeThemeHandler}>저장</SaveBtn>
          <CloseBtn onClick={closeThemeHandler}>닫기</CloseBtn>
        </BtnBox>
      </ModalView>
    </ModalBackground>
  );
}

export const ModalBackground = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  animation: ${fadeAction} 0.3s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 25px;
  border-radius: 10px;
  background-color: #194470;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  animation: ${fadeExpand} 0.3s ease-in-out;
  gap: 15px;

  @media screen and (max-width: 480px) {
    width: 70%;
  }
`;

const ModalTitle = styled.div`
  color: white;
  font-size: 20px;
`;

export const ImgContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  padding: 20px;
  gap: 15px;
  background: white;
  border-radius: 10px;
`;

export const ImgBox = styled.div`
  width: 160px;
  height: 150px;
  margin: 0 5px 5px 5px;
  border-radius: 5px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 12px 0px;
`;

export const ImgName = styled.div`
  color: ${colorSet.base};
  font-weight: bold;
`;

export const SelectImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 20px 10px; */
`;

export const SelectInput = styled.input``;

export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
`;

export const SaveBtn = styled.button`
  width: 80px;
  padding: 10px;
  margin: 2px;
  border-radius: 5px;
  background: transparent;
  border: 1px solid #fff;
  font-weight: 700;
  color: #fff;
  &:hover {
    color: #fff;
    outline: 0;
    box-shadow: 0 0 40px 40px #7c8eff inset;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  }
  &:focus {
    color: #fff;
    outline: 0;
  }
`;

export const CloseBtn = styled.button`
  width: 80px;
  padding: 10px;
  margin: 2px;
  border-radius: 5px;
  background: transparent;
  border: 1px solid #fff;
  font-weight: 700;
  color: #fff;
  &:hover {
    color: #fff;
    outline: 0;
    box-shadow: 0 0 40px 40px #7c8eff inset;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  }
  &:focus {
    color: #fff;
    outline: 0;
  }
`;
