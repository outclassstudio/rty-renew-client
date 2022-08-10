import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { deleteGift, updateGift } from "../apis/giftApi";
import {
  setConfirmModal,
  setConfirmRes,
  setIsOpenSave,
  setIsOpenTrash,
  setMyGift,
  setStorageGift,
} from "../redux/reducers/spaceReducer";
import { fadeAction, fadeExpand } from "../style/global";

export function ConfirmModal(props: any) {
  const dispatch = useDispatch();
  const isOpenTrash = useSelector(
    (state: any) => state.spaceReducer.isOpenTrash
  );
  const isOpenSave = useSelector((state: any) => state.spaceReducer.isOpenSave);

  const changeData = props.changeData;
  const msg = props.msg;
  // const setIsConfirmRes = props.setIsConfirmRes;
  const okModalHandler = () => {
    //dispatch(setConfirmRes(true));
    //기능 수행 후 모달 해제
    if (msg === "저장") {
      dispatch(setConfirmRes(true));
      updateGift(changeData).then((res) => {
        //성공적으로 저장 되면
        if (res.status === 200) {
          dispatch(setConfirmModal(false));
          dispatch(setIsOpenSave(!isOpenSave));
          const filteredList = res.data.filter(
            (el: any) => el.status === "storage"
          );
          dispatch(setStorageGift(filteredList));
        }
      });
    }
    if (msg === "정말 삭제") {
      dispatch(setConfirmRes(true));

      deleteGift(changeData).then((res) => {
        if (res.status === 200) {
          dispatch(setMyGift(res.data));
          dispatch(setConfirmModal(false));
          dispatch(setIsOpenTrash(!isOpenTrash));
        }
      });
    }
  };

  const cancleModalHandler = () => {
    if (msg === "저장") {
      dispatch(setConfirmRes(false));
      dispatch(setIsOpenSave(!isOpenSave));
      dispatch(setConfirmModal(false));
    }
    if (msg === "정말 삭제") {
      dispatch(setConfirmRes(false));
      dispatch(setIsOpenTrash(!isOpenTrash));
      dispatch(setConfirmModal(false));
    }
  };

  return (
    <ModalBackground>
      <ModalView>
        <Icon className="swal2-icon swal2-error swal2-icon-show">
          <div className="swal2-icon-content">!</div>
        </Icon>
        <ContentBox>
          <div>
            <div className="swal2-title">{msg} 하시겠습니까?</div>
            <BtnWrapper>
              <Button
                className="swal2-confirm swal2-styled"
                onClick={okModalHandler}
              >
                OK
              </Button>
              <Button
                className="swal2-deny swal2-styled"
                onClick={cancleModalHandler}
              >
                NO
              </Button>
            </BtnWrapper>
          </div>
        </ContentBox>
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
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${fadeAction} 0.2s ease-out;
`;

export const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 450px;
  padding: 2rem 1rem 2rem;
  border-radius: 6px;
  background-color: #efefef;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  animation: ${fadeExpand} 0.2s ease-out;

  @media screen and (max-width: 480px) {
    width: 70%;
  }
  user-select: none;
`;

export const ContentBox = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
`;

export const Button = styled.button`
  width: 90px;
  height: 40px;
  margin: 5px;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
