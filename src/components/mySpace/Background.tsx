import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userInfo } from "../../redux/actions/index";
import { changeTheme, getThemeList } from "../../apis/userApi";
import { setModalOpen } from "../../redux/reducers/spaceReducer";

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
  width: 600px;
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

export const ImgContainer = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;
export const ImgBox = styled.div`
  width: 180px;
  height: 200px;
  margin: 0 12px 12px 12px;
  border-radius: 5px;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

export const ImgName = styled.p``;

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
  width: 60px;
  padding: 5px;
  margin: 2px;
`;

export const CloseBtn = styled.button`
  padding: 5px;
  width: 60px;
  margin: 2px;
`;

export default function Background() {
  const dispatch = useDispatch();
  const [checkedItem, setCheckedItem] = useState<Array<any>>([]);
  const [themeList, setThemeList] = useState<Array<any>>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  useEffect(() => {
    getThemeList().then((res) => {
      if (res.status === 200) {
        setThemeList(res.data);
        setIsLoading(true);
      }
    });
  }, []);

  console.log("themeList", themeList);

  const checkedItemHandler = (isCheckd: boolean, item: string) => {
    if (isCheckd) {
      setCheckedItem([item]);
    } else {
      setCheckedItem(checkedItem.filter((el) => el !== item));
    }
  };

  const changeThemeHandler = async () => {
    if (checkedItem.length !== 0) {
      // dispatch(await editTheme(checkedItem[0]));
      changeTheme(checkedItem[0]).then((res) => {
        let info = res.data;
        console.log(info, "Avatar");
        dispatch(userInfo(info));
      });
      // dispatch(setModalOpen(false));
      window.location.replace("/");
    }
  };

  const closeThemeHandler = () => {
    dispatch(setModalOpen(false));
  };

  return (
    <ModalBackground>
      <ModalView>
        <ImgContainer>
          {themeList.map((theme, idx) => {
            return (
              <SelectImg key={idx}>
                <ImgBox>
                  <Img src={theme.url} alt="theme" />
                </ImgBox>
                <ImgName>{theme.name}</ImgName>
                <SelectInput
                  type="checkbox"
                  value={theme.name}
                  onChange={(e) =>
                    checkedItemHandler(e.target.checked, e.target.value)
                  }
                  checked={checkedItem.includes(theme.name) ? true : false}
                ></SelectInput>
              </SelectImg>
            );
          })}
        </ImgContainer>

        <BtnBox>
          <SaveBtn onClick={changeThemeHandler}>저장</SaveBtn>
          <CloseBtn onClick={closeThemeHandler}> 닫기</CloseBtn>
        </BtnBox>
      </ModalView>
    </ModalBackground>
  );
}
