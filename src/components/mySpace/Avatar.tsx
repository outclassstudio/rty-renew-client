import styled from "styled-components";
import { useEffect, useState } from "react";
import { ReactComponent as MyAvatar } from "../../assets/images/svg/myAvatar.svg";
import { ReactComponent as Letter } from "../../assets/images/svg/letter.svg";
import { changeMsg, getMyInfo } from "../../apis/userApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setNickname, setTo } from "../../redux/reducers/sendGiftReducer";
import AllGift from "./gift/AllGift";
import Swal from "sweetalert2";
import { colorSet } from "../../style/global";

export function Avatar(props: any) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userGiftList = useSelector((state: any) => state.spaceReducer.myGift);
  //user info 가져오기
  const myInfoState = useSelector((state: any) => state.spaceReducer.userInfo);
  const [myInfo, setMyInfo] = useState<any>();
  //avatar state msg
  const [stateMsg, setStateMsg] = useState<any>("");
  // const [isEditBtn, setIsEditBtn] = useState<boolean>(false);
  const [isClickedAvatar, setIsClikedAvatar] = useState<boolean>(false);
  const [isAllGift, setIsAllGift] = useState<boolean>(false);

  const otherUser = props.userInfo;
  const otherGift = props.AllGiftListCount;
  const editType = props.editAvatar;
  const setEdit = props.setEditAvatar;

  //내정보 업데이트
  const handleMyInfo = () => {
    getMyInfo().then((res) => {
      let user = res.data.userInfo;
      if (user) {
        setMyInfo(user);
        setStateMsg(user.msg);
      }
    });
  };

  useEffect(() => {
    setMyInfo(myInfoState);
  }, [myInfoState]);

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
                          fill="black"
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
          <IntroduceMsg>{myInfo.nickname}의 공간입니다</IntroduceMsg>
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
          <IntroduceMsg>{otherUser.nickname}의 공간입니다</IntroduceMsg>
        </AvatarBox>
      ) : null}
      {isAllGift ? <AllGift setIsAllGift={setIsAllGift} /> : null}
    </>
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

const MsgEditBtn = styled.button`
  border: 1px solid white;
  background-color: transparent;
  width: 36px;
  cursor: pointer;
  border-radius: 40%;
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
