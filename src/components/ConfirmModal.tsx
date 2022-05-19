import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setConfirmModal, setConfirmRes } from "../redux/reducers/spaceReducer";

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

  const setIsConfirmRes = props.setIsConfirmRes;
  const okModalHandler = () => {
    console.log("okokok", setIsConfirmRes);
    //dispatch(setConfirmRes(true));
    setIsConfirmRes(true);
  };

  const cancleModalHandler = () => {
    console.log("nono");
    dispatch(setConfirmModal(false));
  };

  return (
    <ModalBackground>
      <ModalView>
        <ContentBox>
          <div>
            <p>저장 또는 삭제 하시겠습니까?</p>
            <Button onClick={okModalHandler}>OK</Button>
            <Button onClick={cancleModalHandler}>NO</Button>
          </div>
        </ContentBox>
      </ModalView>
    </ModalBackground>
  );
}
