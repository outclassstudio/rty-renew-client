import { useNavigate } from "react-router";
import styled from "styled-components";
import { NormalBtn } from "../style/btnStyle.style";
import { colorSet } from "../style/global";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <TextWrapper>
        <Stop
          src="https://cdn.discordapp.com/attachments/974114424036155505/978530134460096582/cancel_pink.png"
          alt=""
        />
        <Text>존재하지 않는 페이지에요</Text>
        <NormalBtn
          className="c"
          width={"150px"}
          height={"30px"}
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          홈으로
        </NormalBtn>
      </TextWrapper>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url("https://cdn.discordapp.com/attachments/974114424036155505/976650594225909760/background3.png");
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const Stop = styled.img`
  width: 80px;
  height: 80px;
`;

const Text = styled.div`
  font-family: "Hanna", sans-serif;
  font-size: 80px;
  color: ${colorSet.base};
  margin-bottom: 10px;
`;
