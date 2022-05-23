import styled from "styled-components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userInfo } from "../../redux/actions/index";
import { changeTheme, getThemeList } from "../../apis/userApi";
import { setModalOpen, setUserInfo } from "../../redux/reducers/spaceReducer";
import { NormalBtn } from "../../style/btnStyle.style";
import { colorSet, fadeAction, fadeExpand } from "../../style/global";

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
  /* width: 600px; */
  padding: 25px 40px 25px 40px;
  border-radius: 10px;
  background-color: ${colorSet.purple};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  animation: ${fadeExpand} 0.3s ease-in-out;

  @media screen and (max-width: 480px) {
    width: 70%;
  }
`;

const ModalTitle = styled.div`
  color: white;
  font-size: 20px;
  margin-bottom: 25px;
`;

export const ImgContainer = styled.div`
  /* width: 400px; */
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 35px 20px;
  gap: 15px;
  background: white;
  /* border-radius: 10px; */
`;

export const ImgBox = styled.div`
  width: 160px;
  height: 120px;
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
  margin-top: 25px;
  gap: 15px;
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
        dispatch(setUserInfo(info));
      });
      dispatch(setModalOpen(false));
      // window.location.replace("/");
    }
  };

  const closeThemeHandler = () => {
    dispatch(setModalOpen(false));
  };

  return (
    <ModalBackground>
      <ModalView>
        <ModalTitle>🎨테마를 선택해주세요</ModalTitle>
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
          <NormalBtn
            className="c"
            width={"80px"}
            height={"30px"}
            onClick={changeThemeHandler}
          >
            저장
          </NormalBtn>
          <NormalBtn
            className="b"
            width={"80px"}
            height={"30px"}
            onClick={closeThemeHandler}
          >
            닫기
          </NormalBtn>
        </BtnBox>
      </ModalView>
    </ModalBackground>
  );
}
