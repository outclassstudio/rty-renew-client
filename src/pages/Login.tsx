import { useNavigate } from "react-router";
import styled from "styled-components";
import LoginForm from "../components/LoginForm";
import { colorSet, fadeAction } from "../style/global";

export default function Login() {
  const navigate = useNavigate();

  return (
    <MainContainer>
      <Logo
        src="https://i.imgur.com/ITptV6p.png"
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
  animation: 0.7s ease-in-out ${fadeAction};
  /* background-image: url("https://i.imgur.com/8d2hJfL.jpg");
  background-position: center;
  background-size: cover; */
`;

const Logo = styled.img`
  width: 320px;
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupText = styled.div`
  font-size: 13px;
  color: #535353;
  cursor: pointer;

  :hover {
    color: ${colorSet.pink};
  }
`;
