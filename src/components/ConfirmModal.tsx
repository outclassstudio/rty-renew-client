import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeGift, deleteGift } from "../apis/giftApi";
import {
  setConfirmModal,
  setConfirmRes,
  setIsOpenSave,
  setIsOpenTrash,
  setMyGift,
  setStorageGift,
} from "../redux/reducers/spaceReducer";

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
  width: 450px;
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

export const ContentBox = styled.div`
  width: 500px;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  width: 90px;
  height: 40px;
  margin: 5px;
`;

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
    console.log("okokok", changeData, msg);
    //dispatch(setConfirmRes(true));
    //기능 수행 후 모달 해제
    if (msg === "저장") {
      dispatch(setConfirmRes(true));
      changeGift(changeData).then((res) => {
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
          console.log("okokok", "delete");
          dispatch(setMyGift(res.data));
          dispatch(setConfirmModal(false));
          dispatch(setIsOpenTrash(!isOpenTrash));
        }
      });
    }
  };

  const cancleModalHandler = () => {
    console.log("nono");
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
        <ContentBox>
          <div>
            <p>{msg} 하시겠습니까?</p>
            <Button onClick={okModalHandler}>OK</Button>
            <Button onClick={cancleModalHandler}>NO</Button>
          </div>
        </ContentBox>
      </ModalView>
    </ModalBackground>
  );
}
