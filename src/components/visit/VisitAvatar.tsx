import styled from "styled-components";
import { colorSet } from "../../style/global";
import { ReactComponent as MyAvatar } from "../../assets/images/svg/myAvatar.svg";

export default function VisitAvatar({ userInfo }: any) {
  return (
    <>
      {userInfo ? (
        <AvatarBox>
          <MsgBox>
            <p>{userInfo.msg}</p>
          </MsgBox>
          <MyAvatar />
          <H3>내 이름은 {userInfo.nickname}!!</H3>
        </AvatarBox>
      ) : null}
    </>
  );
}

const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  margin-bottom: 50px;
  width: 150px;
`;

const MsgBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  min-width: 160px;
  height: 45px;
  background-color: ${colorSet.purple};
  border-radius: 10px;
  margin: 10px;
  padding: 0px 10px;
  color: white;

  input {
    background: none;
    border: none;
    color: white;
  }
  input:focus {
    outline: none;
  }
`;

const H3 = styled.div`
  margin-top: 10px;
  color: white;
  font-family: "Hanna", sans-serif;
  text-shadow: 1px 1px 0px black;
`;
