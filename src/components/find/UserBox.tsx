import styled from "styled-components";
import { colorSet, fadeMoveAction } from "../../style/global";
import { ReactComponent as Letter } from "../../assets/images/svg/letter.svg";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setNickname, setTo } from "../../redux/reducers/sendGiftReducer";
import Swal from "sweetalert2";
import { BASE_URL, LOCALSTORAGE_ID } from "../../constants";

interface IUserBoxProps {
  data: Users.myinfoDTO;
}

export default function UserBox({ data }: IUserBoxProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVisitOthers = (userId: string, id: number) => {
    if (userId === localStorage.getItem(LOCALSTORAGE_ID)) {
      Swal.fire({
        title: "자신의 페이지는 방문할 수 없어요",
        icon: "warning",
        confirmButtonText: "닫기",
      });
    } else {
      navigate(`/visit/${id}`);
    }
  };

  return (
    <BoxContainer>
      <ThumbnailWrapper>
        <Thumbnail src={data.theme ? `${BASE_URL}${data.theme.data}` : ""} />
        <Title>{data.nickname}님</Title>
      </ThumbnailWrapper>
      <GroupWrapper>
        <Left>
          <ItemWrapper className="id">
            <ItemName>아이디</ItemName>
            <ItemContent>{data.userId}</ItemContent>
          </ItemWrapper>
          <ItemWrapper>
            <ItemName>생일</ItemName>
            <ItemContent>{data.birth}</ItemContent>
          </ItemWrapper>
        </Left>
        <Right>
          <Icon>
            <HomeImg
              src={
                "https://cdn.discordapp.com/attachments/974114424036155505/979197253422030898/home_white.png"
              }
              alt=""
              onClick={() => {
                handleVisitOthers(data.userId, data.id);
              }}
            />
          </Icon>
          <Icon>
            <Letter
              width="23"
              fill="white"
              onClick={() => {
                navigate(`/send`);
                dispatch(setTo(data.userId));
                dispatch(setNickname(data.nickname));
              }}
            />
          </Icon>
        </Right>
      </GroupWrapper>
    </BoxContainer>
  );
}

const BoxContainer = styled.div`
  display: flex;
  width: 255px;
  height: 129px;
  background: #e9e9e9;
  border-radius: 10px;
  box-shadow: rgba(80, 80, 80, 0.5) 0px 0px 8px 0px;
  /* animation: ${fadeMoveAction} 0.4s ease-out; */
`;

const ThumbnailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 90px;
  border-radius: 10px 0px 0px 0px;
`;

const Title = styled.div`
  font-size: 13px;
  font-weight: bold;
  background: ${colorSet.base};
  color: white;
  padding: 10px;
  border-radius: 0px 0px 0px 10px;
`;

const GroupWrapper = styled.div`
  width: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Left = styled.div`
  height: 70px;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const Right = styled.div`
  width: 135px;
  height: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  /* padding: 0px 5px 0px 0px; */
`;

const ItemWrapper = styled.div`
  display: flex;
  gap: 5px;
  font-size: 13px;
  justify-content: center;

  &.id {
    border-bottom: 1px dotted #7a7a7a78;
    padding-bottom: 5px;
  }
`;

const ItemName = styled.div`
  color: #444444a7;
  width: 39px;
`;

const ItemContent = styled.div`
  width: 75px;
  font-weight: bold;
  color: ${colorSet.base};
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colorSet.purple};
  width: 38px;
  height: 38px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 5px 0px;
  cursor: pointer;
`;

const HomeImg = styled.img`
  width: 24px;
  margin-bottom: 3px;
`;
