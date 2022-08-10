import { useNavigate } from "react-router";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import { colorSet, fadeAction, fadeMoveActionDelay } from "../style/global";

export default function Login() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Logo
        src="https://cdn.discordapp.com/attachments/974114424036155505/978189535957614592/main_logo.png"
        title="logo_sample(png).png"
      />
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
      <SignupText onClick={() => navigate("/signup")}>
        회원가입 할래요
      </SignupText>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  animation: 0.6s ease-in-out ${fadeAction};
  background-image: url("https://cdn.discordapp.com/attachments/974114424036155505/976650594225909760/background3.png");
  background-position: center;
  background-size: cover;
`;

const Logo = styled.img`
  width: 320px;
  animation: 0.7s ease-in-out ${fadeMoveActionDelay};
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  animation: 0.7s ease-in-out ${fadeMoveActionDelay};
`;

const SignupText = styled.div`
  font-size: 13px;
  color: #535353;
  cursor: pointer;
  animation: 0.7s ease-in-out ${fadeMoveActionDelay};

  :hover {
    color: ${colorSet.pink};
  }
`;
