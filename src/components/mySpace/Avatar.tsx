import styled from "styled-components";
import { useEffect, useState } from "react";
import { userInfo } from "../../redux/actions/index";
import { ReactComponent as MyAvatar } from "../../assets/images/svg/myAvatar.svg";
import { ReactComponent as Letter } from "../../assets/images/svg/letter.svg";
import { changeMsg, getUserInfo } from "../../apis/userApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { colorSet } from "../../style/global";
import { useNavigate } from "react-router";
import { setNickname, setTo } from "../../redux/reducers/sendGiftReducer";
import AllGift from "./Gift/AllGift";
import Swal from "sweetalert2";

export const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  margin-top: 170px;
  margin-right: -23px;
  width: 160px;
  user-select: none;
`;

export const MsgBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  /* min-width: 160px; */
  height: 45px;
  background-color: ${colorSet.purple};
  border-radius: 15px;
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

export const MsgEditBtn = styled.button`
  border: 1px solid white;
  background-color: transparent;
  width: 36px;
  cursor: pointer;
  /* margin: 5px; */
  border-radius: 40%;
`;

export const H3 = styled.div`
  margin-top: 10px;
  color: white;
  font-family: "Hanna", sans-serif;
  text-shadow: 1px 1px 0px black;
  font-size: 18px;
  word-break: break-all;
`;

export const Input = styled.input`
  width: 130px;
  font-size: 13px;
  /* margin: 2px; */
`;

export const Circle = styled.div`
  display: flex;
  justify-content: center;
  width: 40px;
  margin: 3px;
  border-radius: 50%;
  background: #00d3d3;
  align-items: center;
  cursor: pointer;
  padding-left: 1px;
`;

const MyMsg = styled.div`
  min-width: 130px;
  font-size: 13px;
`;

export const P = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: white;
  margin-bottom: 2px;
`;

export const CircleBox = styled.div`
  display: flex;
  height: 45px;
  margin: 10px;
`;

export function Avatar(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userGiftList = useSelector((state: any) => state.spaceReducer.myGift);
  //user info 가져오기
  // const myInfo = useSelector((state: any) => state.spaceReducer.userInfo);
  const [myInfo, setMyInfo] = useState<any>();
  //avatar state msg
  const [stateMsg, setStateMsg] = useState<any>("");
  const [isEditBtn, setIsEditBtn] = useState<boolean>(false);
  const [isClickedAvatar, setIsClikedAvatar] = useState<boolean>(false);
  const [isAllGift, setIsAllGift] = useState<boolean>(false);

  const otherUser = props.userInfo;
  const otherGift = props.AllGiftListCount;
  const editType = props.editAvatar;
  const setEdit = props.setEditAvatar;

  useEffect(() => {
    getUserInfo().then((res) => {
      let user = res.data;
      setMyInfo(user);
      setStateMsg(user.msg);
    });
  }, [dispatch, userGiftList]);

  const editBtnHandler = () => {
    const blank_pattern = /^\s+|\s+$/g;
    if (blank_pattern.test(stateMsg) === true) {
      Swal.fire({
        title: "공백은 안 돼요",
        icon: "warning",
        confirmButtonText: "닫기",
      });
    } else {
      changeMsg(stateMsg).then((res) => {
        let info = res.data;
        setMyInfo(info);
        dispatch(userInfo(info));
        setIsEditBtn(false);
      });

      setEdit(!setEdit);
      setStateMsg("");
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

    //서버에게 user 상태 메세지 변경 post 요청 보내기
  };

  const clickAvatarHandler = () => {
    setIsClikedAvatar(!isClickedAvatar);
  };

  const sendGiftHandler = () => {
    console.log("other user send click", otherUser);
    // 클릭한 유저에게 선물 보내기 페이지 라우팅

    navigate("/send", { state: otherUser.id });
    dispatch(setTo(otherUser.id));
    dispatch(setNickname(otherUser.nickname));
  };

  const openAllGiftHandler = () => {
    //편지 모달 띄우기
    setIsAllGift(true);
  };

  return (
    <>
      {myInfo && !otherUser ? (
        <AvatarBox>
          {isClickedAvatar ? (
            <CircleBox>
              <Circle>
                <P>{userGiftList.length}</P>
              </Circle>
              <Circle>
                <Letter width="24" fill="white" onClick={openAllGiftHandler} />
              </Circle>
            </CircleBox>
          ) : (
            <MsgBox>
              {editType ? (
                <>
                  <Input
                    type="text"
                    maxLength={10}
                    onChange={inputChangeHandler}
                    value={stateMsg}
                  />
                  <MsgEditBtn onClick={editBtnHandler}>
                    <svg
                      width="24"
                      height="24"
                      fill="white"
                      xmlns="http://www.w3.org/2000/svg"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    >
                      <path d="M8.071 21.586l-7.071 1.414 1.414-7.071 14.929-14.929 5.657 5.657-14.929 14.929zm-.493-.921l-4.243-4.243-1.06 5.303 5.303-1.06zm9.765-18.251l-13.3 13.301 4.242 4.242 13.301-13.3-4.243-4.243z" />
                    </svg>
                  </MsgEditBtn>
                </>
              ) : (
                <MyMsg>{myInfo.msg}</MyMsg>
              )}
            </MsgBox>
          )}
          <MyAvatar onClick={clickAvatarHandler} />
          <H3>내 이름은 {myInfo.nickname}!!</H3>
        </AvatarBox>
      ) : null}
      {otherUser ? (
        <AvatarBox>
          {isClickedAvatar ? (
            <CircleBox>
              <Circle>
                <P>{otherGift}</P>
              </Circle>
              <Circle onClick={sendGiftHandler}>
                <Letter width="24" fill="white" />
              </Circle>
            </CircleBox>
          ) : (
            <MsgBox>
              <p>{otherUser.msg}</p>
            </MsgBox>
          )}
          <MyAvatar onClick={clickAvatarHandler} />
          <H3>내 이름은 {otherUser.nickname}!!</H3>
        </AvatarBox>
      ) : null}
      {isAllGift ? <AllGift setIsAllGift={setIsAllGift} /> : null}
    </>
  );
}
