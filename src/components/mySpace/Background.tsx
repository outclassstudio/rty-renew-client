import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { changeTheme, getMyInfo } from "../../apis/userApi";
import { setModalOpen, setUserInfo } from "../../redux/reducers/spaceReducer";
import { colorSet, fadeAction, fadeExpand } from "../../style/global";
import NumberCarousel from "../common/NumberCarousel";
import { getMyItems } from "../../apis/itemApi";
import { NormalBtn } from "../../style/btnStyle.style";
import { useSelector } from "react-redux";

export default function Background() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: any) => state.spaceReducer.userInfo);
  const [checkedItem, setCheckedItem] = useState<number>(0);
  const [themeList, setThemeList] = useState<Item.singleItemDTO[]>([]);
  const [page, setPage] = useState<number>(1);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(12);

  useEffect(() => {
    let myTheme: Item.singleItemDTO[];
    getMyItems().then((res) => {
      if (res.data.myItems) {
        myTheme = res.data.myItems.filter((el) => el.type === "theme");
      }
      setThemeList(myTheme);
    });
    setCheckedItem(userInfo.theme.id);
  }, []);

  const checkedItemHandler = (isCheckd: boolean, item: string) => {
    if (isCheckd) {
      setCheckedItem(+item);
    }
  };

  const changeThemeHandler = async () => {
    if (checkedItem) {
      changeTheme(checkedItem).then((res) => {
        if (res.data.ok) {
          getMyInfo().then((res) => dispatch(setUserInfo(res.data.userInfo)));
        }
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
                  value={theme.id}
                  onChange={(e) =>
                    checkedItemHandler(e.target.checked, e.target.value)
                  }
                  checked={checkedItem === theme.id ? true : false}
                ></SelectInput>
              </SelectImg>
            );
          })}
        </ImgContainer>
        <BtnBox>
          <NormalBtn
            className="a"
            width="90px"
            height="35px"
            onClick={changeThemeHandler}
          >
            저장
          </NormalBtn>
          <NormalBtn
            className="b"
            width="90px"
            height="35px"
            onClick={closeThemeHandler}
          >
            닫기
          </NormalBtn>
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
  width: 975px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  padding: 25px;
  border-radius: 10px;
  background-color: ${colorSet.purple};
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

const ImgContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: center;
  padding: 20px;
  gap: 15px;
  background: white;
  border-radius: 10px;
`;

const ImgBox = styled.div`
  width: 200px;
  height: 150px;
  margin: 0 5px 5px 5px;
  border-radius: 5px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 12px 0px;
`;

const ImgName = styled.div`
  color: ${colorSet.base};
  font-weight: bold;
`;

const SelectImg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectInput = styled.input``;

export const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
`;
