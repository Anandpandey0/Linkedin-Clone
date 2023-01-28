import styled from "styled-components";
import { connect } from "react-redux";
import { signInAPI } from "../actions";
import { Navigate } from "react-router";

const Login = (props) => {
  return (
    <Container>
      {props.user && <Navigate to="/home" />}
      <Nav>
        <a href="/">
          <img src="/images/login-logo.svg" alt="" />
        </a>
        <div>
          <Join>Join now</Join>
          <SignIn>Sign in</SignIn>
        </div>
      </Nav>
      <Section>
        <LeftSection>
          <h1>Welcome to your professional community</h1>
        </LeftSection>
        <RightSection>
          <img src="/images/login-hero-1.svg" alt="" />
        </RightSection>
      </Section>
      <div>
        <GoogleSignIn onClick={() => props.signIn()}>
          {" "}
          <img src="/images/google.svg" alt="" /> Sign in with Google
        </GoogleSignIn>
      </div>
    </Container>
  );
};
const Container = styled.div`
  padding: 0;
  & > * {
    width: 100%;
  }
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  max-width: 1128px;
  margin: auto;
  padding: 12px 0 16px;
  flex-wrap: nowrap;

  position: relative;
  & > a {
    width: 130px;
    height: 30px;
    @media (max-width: 768px) {
      padding: 0px 5px;
    }
  }
  & > a > img {
    @media (max-width: 768px) {
      text-align: center;
      margin: 3px 0px;
      width: 100px;
      height: 20px;
    }
  }
`;
const Join = styled.a`
  font-size: 1rem;
  padding: 15px 15px;
  text-decoration: none;
  border-radius: 2rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  margin-right: 0.5rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.9);
    text-decoration: none;
    cursor: pointer;
  }
`;
const SignIn = styled.a`
  border: solid 1px rgb(10, 102, 194);
  text-align: center;
  border-radius: 2rem;
  padding: 15px 24px;
  width: 30px;
  font-weight: 500;
  color: rgb(10, 102, 194);
  transition-duration: 120ms;
  &:hover {
    background-color: rgba(112, 181, 249, 0.15);
    color: #0a66c2;
    cursor: pointer;
    text-decoration: none;
  }
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
  height: 60vh;
  align-content: start;
  margin-left: 0.5rem;
  padding-bottom: 25px;
  @media (max-width: 768px) {
    flex-direction: row;
    & > * {
      width: 100%;
    }
  }
`;
const LeftSection = styled.div`
  /* border: solid 2px red; */
  width: 45%;

  h1 {
    margin: 2rem auto;
    padding-bottom: 0;
    width: 80%;
    color: #4b4a4a;
    font-size: 45px;
    font-weight: 300;
    line-height: 70px;
    @media (max-width: 768px) {
      margin: 0rem 0rem;
      line-height: 0px;
      /* text-align: center; */
      font-size: 25px;
      line-height: 2;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const RightSection = styled.div`
  height: 100%;
  width: 55%;

  & > img {
    margin-top: 2rem;
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
  @media (max-width: 768px) {
    width: 100%;
    height: 55%;
  }
`;
const GoogleSignIn = styled.button`
  display: flex;
  height: 4rem;
  border: 2px solid lightgrey;
  color: grey;
  background-color: white;
  border-radius: 2rem;
  align-items: center;
  margin: 0rem 2rem;
  width: 40%;
  padding: 5px;
  text-align: center;
  justify-content: center;
  font-size: larger;
  & > img {
    margin-right: 1.5rem;
  }
  &:hover {
    background-color: lightgrey;
    color: black;
    border: 3px solid black;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    margin: 0rem 0rem;
    width: 100%;
    height: 3rem;
  }
`;

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
