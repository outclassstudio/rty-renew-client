import styled from "styled-components";
import { useEffect, useState } from "react";
import { ReactComponent as MyAvatar } from "../../assets/images/svg/myAvatar.svg";
import { ReactComponent as EditButton } from "../../assets/images/svg/edit.svg";
import { ReactComponent as Letter } from "../../assets/images/svg/letter.svg";
import { changeMsg, getMyInfo } from "../../apis/userApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setNickname, setTo } from "../../redux/reducers/sendGiftReducer";
import Swal from "sweetalert2";
import { colorSet } from "../../style/global";
import { setUserInfo } from "../../redux/reducers/spaceReducer";
import { RootState } from "../../redux/reducers";

interface IAvatarProps {
  otherUserInfo?: Users.myinfoDTO;
  otherGiftCount?: number;
  editMyMsg?: boolean;
  // setEditMyMsg?: React.Dispatch<React.SetStateAction<boolean>>;
  setEditMyMsg?: any;
}

export function Avatar({
  otherUserInfo,
  otherGiftCount,
  editMyMsg,
  setEditMyMsg,
}: IAvatarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userGiftList = useSelector(
    (state: RootState) => state.spaceReducer.myGift
  );
  const myInfoState = useSelector(
    (state: RootState) => state.spaceReducer.userInfo
  );
  //avatar state msg
  const [stateMsg, setStateMsg] = useState<string>("");
  const [isClickedAvatar, setIsClikedAvatar] = useState<boolean>(false);

  useEffect(() => {
    if (myInfoState.msg) {
      setStateMsg(myInfoState.msg);
    }
  }, [myInfoState]);

  //내정보 업데이트
  const handleMyInfo = () => {
    getMyInfo().then((res) => {
      let user = res.data.userInfo;
      if (user) {
        dispatch(setUserInfo(user));
      }
    });
  };

  const editBtnHandler = () => {
    const blank_pattern = /^\s+|\s+$/g;
    if (blank_pattern.test(stateMsg) === true) {
      Swal.fire({
        title: "공백은 안 돼요",
        icon: "warning",
        confirmButtonText: "닫기",
      });
    } else {
      changeMsg(stateMsg).then(() => {
        handleMyInfo();
      });
      setEditMyMsg(!editMyMsg);
    }
  };

  const inputChangeHandler = (e: any) => {
    //msg변경
    if (e.target.value === " " || e.target.value === null) {
      Swal.fire({
        title: "공백은 안 돼요",
        icon: "warning",
        confirmButtonText: "닫기",
      });
    } else {
      setStateMsg(e.target.value);
    }
  };

  const clickAvatarHandler = () => {
    setIsClikedAvatar(!isClickedAvatar);
  };

  const sendGiftHandler = () => {
    // 클릭한 유저에게 선물 보내기 페이지 라우팅
    if (otherUserInfo) {
      navigate("/send", { state: otherUserInfo.id });
      dispatch(setTo(otherUserInfo.nickname));
      dispatch(setNickname(otherUserInfo.nickname));
    }
  };

  return (
    <AvatarBox>
      <ContentBox>
        {isClickedAvatar ? (
          <CircleBox>
            <Circle>
              <P>{otherUserInfo ? otherGiftCount : userGiftList.length}</P>
            </Circle>
            {otherUserInfo ? (
              <Circle onClick={sendGiftHandler}>
                <Letter width="24" fill="white" />
              </Circle>
            ) : (
              <Circle onClick={() => navigate("/userinfo")}>
                <UserInfo src="https://i.imgur.com/avLXvDj.png" alt="" />
              </Circle>
            )}
          </CircleBox>
        ) : (
          <ArrowBox>
            {editMyMsg && !otherUserInfo ? (
              <EditBox>
                <Input
                  type="text"
                  maxLength={10}
                  onChange={inputChangeHandler}
                  value={stateMsg}
                />
                <MsgEditBtn onClick={editBtnHandler}>
                  <EditButton />
                </MsgEditBtn>
              </EditBox>
            ) : (
              <MyMsg>
                {otherUserInfo ? otherUserInfo.msg : myInfoState.msg}
              </MyMsg>
            )}
          </ArrowBox>
        )}
      </ContentBox>
      <MyAvatar onClick={clickAvatarHandler} />
      <IntroduceMsg>
        {otherUserInfo ? otherUserInfo.nickname : myInfoState.nickname}의
        공간입니다
      </IntroduceMsg>
    </AvatarBox>
  );
}

const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 170px;
  height: 365px;
  user-select: none;
`;

const MsgEditBtn = styled.div`
  background-color: transparent;
  width: 30px;
  cursor: pointer;
`;

const IntroduceMsg = styled.div`
  margin-top: 10px;
  color: white;
  font-family: "Hanna", sans-serif;
  text-shadow: 1px 1px 0px black;
  font-size: 17px;
  word-break: break-all;
`;

const Input = styled.input`
  width: 140px;
  height: 30px;
  margin-right: 5px;
  background: transparent;
  border-radius: 4px;
  border: none;
  font-size: 22px;
  font-weight: 900;
  color: ${colorSet.base};
  padding-left: 5px;
`;

const Circle = styled.div`
  display: flex;
  justify-content: center;
  width: 55px;
  margin: 3px;
  border-radius: 50%;
  background: #00d3d3;
  align-items: center;
  cursor: pointer;
  padding-left: 1px;
  &:hover {
    outline: 0;
    box-shadow: 0 0 40px 40px #f13838 inset;
    transition: box-shadow 300ms ease-in-out, color 300ms ease-in-out;
  }
`;

const UserInfo = styled.img`
  width: 30px;
`;

const MyMsg = styled.div`
  align-items: center;
  display: flex;
  font-size: 22px;
  font-weight: 900;
  color: ${colorSet.base};
`;

const ArrowBox = styled.div`
  display: flex;
  position: relative;
  background: #d6d6fe;
  border: 4px solid ${colorSet.base};
  width: 210px;
  border-radius: 10px;
  justify-content: center;
  height: 60px;
  color: #fff;
  box-shadow: 1px 1px black;

  :after,
  :before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }

  :after {
    border-color: rgba(136, 183, 213, 0);
    border-top-color: #d6d6fe;
    border-width: 10px;
    margin-left: -10px;
  }
  :before {
    border-color: rgba(194, 225, 245, 0);
    border-top-color: ${colorSet.base};
    border-width: 16px;
    margin-left: -16px;
  }
`;

const P = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
  margin-bottom: 2px;
`;

const EditBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const CircleBox = styled.div`
  display: flex;
  height: 60px;
  margin: 10px;
`;
const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  width: 250px;
  height: 100px;
  align-items: center;
`;
