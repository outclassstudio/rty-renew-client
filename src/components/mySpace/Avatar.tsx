import styled from "styled-components";
import { useEffect, useState } from "react";
import { ReactComponent as MyAvatar } from "../../assets/images/svg/myAvatar.svg";
import { ReactComponent as Letter } from "../../assets/images/svg/letter.svg";
import { changeMsg, getUserInfo } from "../../apis/userApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setNickname, setTo } from "../../redux/reducers/sendGiftReducer";
import AllGift from "./gift/AllGift";
import Swal from "sweetalert2";

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
        setIsEditBtn(false);
      });

      setEdit(!setEdit);
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
          <ContentBox>
            {isClickedAvatar ? (
              <CircleBox>
                <Circle>
                  <P>{userGiftList.length}</P>
                </Circle>
                <Circle onClick={openAllGiftHandler}>
                  <Letter width="24" fill="white" />
                </Circle>
              </CircleBox>
            ) : (
              <ArrowBox>
                {editType ? (
                  <>
                    <EditBox>
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
                    </EditBox>
                  </>
                ) : (
                  <MyMsg>{myInfo.msg}</MyMsg>
                )}
              </ArrowBox>
            )}
          </ContentBox>
          <MyAvatar onClick={clickAvatarHandler} />
          <H3>내 이름은 {myInfo.nickname}!!</H3>
        </AvatarBox>
      ) : null}
      {otherUser ? (
        <AvatarBox>
          <ContentBox>
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
              <ArrowBox>
                <MyMsg>{otherUser.msg}</MyMsg>
              </ArrowBox>
            )}
          </ContentBox>
          <MyAvatar onClick={clickAvatarHandler} />
          <H3>내 이름은 {otherUser.nickname}!!</H3>
        </AvatarBox>
      ) : null}
      {isAllGift ? <AllGift setIsAllGift={setIsAllGift} /> : null}
    </>
  );
}

export const AvatarBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  /* margin-top: 170px; */
  width: 170px;
  height: 365px;
  user-select: none;
`;

export const MsgBox = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 50px;
  background-color: #3a0ca3;
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
  font-size: 17px;
  word-break: break-all;
`;

export const Input = styled.input`
  border-radius: 4px;
  width: 147px;
  font-size: 13px;
  margin-right: 20px;
  background: transparent;
  height: 30px;
`;

export const Circle = styled.div`
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

const MyMsg = styled.div`
  align-items: center;
  font-size: 22px;
  display: flex;
  font-weight: 900;
`;

const ArrowBox = styled.div`
  display: flex;
  position: relative;
  background: #a4b0ff;
  border: 4px solid #194470;
  width: 240px;
  border-radius: 10px;
  margin-bottom: 20px;
  justify-content: center;
  height: 70px;
  color: #fff;
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
    border-top-color: #a4b0ff;
    border-width: 10px;
    margin-left: -10px;
  }
  :before {
    border-color: rgba(194, 225, 245, 0);
    border-top-color: #194470;
    border-width: 16px;
    margin-left: -16px;
  }
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

export const EditBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const CircleBox = styled.div`
  display: flex;
  height: 60px;
  margin: 10px;
`;
export const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  width: 250px;
  height: 100px;
  align-items: center;
`;
