import styled from "styled-components";
import { useEffect, useState } from "react";
import { userInfo } from "../../redux/actions/index";
import { ReactComponent as MyAvatar } from "../../assets/images/svg/myAvatar.svg";
import { changeMsg } from "../../apis/userApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 170px;
  right: 950px;
  width: 150px;
`;

export const MsgBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  height: 50px;
  background-color: green;
  border-radius: 10px;
  margin: 10px;
  padding: 6px;
  cursor: pointer;
`;

export const MsgEditBtn = styled.button`
  background-color: blue;
  width: 50px;
  border-radius: 10px;
`;

export function Avatar() {
  const dispatch = useDispatch();
  //user info 가져오기
  const myInfo = useSelector((state: any) => state.spaceReducer.userInfo);

  //avatar state msg
  const [stateMsg, setStateMsg] = useState("");
  const [isEditBtn, setIsEditBtn] = useState(false);

  useEffect(() => {
    console.log("userInfouserInfouserInfouserInfo", myInfo);
  }, [myInfo]);

  const editBtnHandler = () => {
    console.log("editBTn ");

    if (isEditBtn) {
      changeMsg(stateMsg).then((res) => {
        let info = res.data;
        console.log(info, "Avatar");
        dispatch(userInfo(info));
      });
    }
    setIsEditBtn(!isEditBtn);
  };

  const inputChangeHandler = (e: any) => {
    //msg변경
    setStateMsg(e.target.value);
    //서버에게 user 상태 메세지 변경 post 요청 보내기
  };
  return (
    <>
      {myInfo ? (
        <AvatarBox>
          <h3>내이름은 {myInfo.nickname}!!</h3>
          <MsgBox>
            {isEditBtn ? (
              <input type="text" maxLength="10" onChange={inputChangeHandler} />
            ) : (
              <p>{myInfo.msg}</p>
            )}

            <MsgEditBtn onClick={editBtnHandler}>
              {isEditBtn ? "저장" : "수정"}
            </MsgEditBtn>
          </MsgBox>
          <MyAvatar />
        </AvatarBox>
      ) : null}
    </>
  );
}
