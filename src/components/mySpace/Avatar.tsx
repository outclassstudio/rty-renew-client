import styled from "styled-components";
import { useState } from "react";
import { ReactComponent as MyAvatar } from "../../assets/images/svg/myAvatar.svg";

export const AvatarBox = styled.div`
  position: absolute;
  top: 170px;
  right: 950px;
  width: 200px;
`;

export const MsgBox = styled.div`
  display: flex;
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
`;

export function Avatar() {
  //avatar icon

  //avatar state msg
  const [stateMsg, setStateMsg] = useState("안녕 만나서 반갑다!");
  const [isEditBtn, setIsEditBtn] = useState(false);

  const editBtnHandler = () => {
    console.log("editBTn ");
    setIsEditBtn(!isEditBtn);
  };

  const inputChangeHandler = (e: any) => {
    //msg변경
    setStateMsg(e.target.value);
    //서버에게 user 상태 메세지 변경 post 요청 보내기
  };
  return (
    <AvatarBox>
      <MsgBox>
        {isEditBtn ? (
          <input onChange={inputChangeHandler} />
        ) : (
          <p>{stateMsg}</p>
        )}

        <MsgEditBtn onClick={editBtnHandler}>
          {isEditBtn ? "save" : "edit"}
        </MsgEditBtn>
      </MsgBox>
      <MyAvatar />
    </AvatarBox>
  );
}
