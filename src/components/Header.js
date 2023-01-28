import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { signOutAPI } from "../actions";
import PostModal from "./PostModal";

const Header = (props) => {
  const [showModal, setShowModal] = useState("close");
  const handleClick = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    switch (showModal) {
      case "open":
        setShowModal("close");
        break;
      case "close":
        setShowModal("open");
        break;
      default:
        setShowModal("close");
        break;
    }
  };
  return (
    <>
      <Container>
        <Logo>
          <img src="/images/home-logo.svg" alt="" />
          <div className="user-image">
            <img src="/images/user.svg" alt="" />
          </div>
          <SearchBar>
            <img src="/images/search-icon.svg" alt="" />
            <input type="text" />
          </SearchBar>
        </Logo>
        <Nav>
          <NavItem className="active">
            <img src="/images/nav-home.svg" alt="" />
            <span>Home</span>
          </NavItem>
          <NavItem>
            <img src="/images/nav-network.svg" alt="" />
            <span>My Network</span>
          </NavItem>

          <NavItem className="active">
            <img src="/images/nav-messaging.svg" alt="" />
            <span>Messaging</span>
          </NavItem>
          <NavItem className="active">
            <img src="/images/nav-add-post.png" alt="" onClick={handleClick} />
            <span onClick={handleClick}> Post</span>
          </NavItem>
          <NavItem className="active">
            <img src="/images/nav-notifications.svg" alt="" />
            <span>Notification</span>
          </NavItem>
          <NavItem className="active">
            <img src="/images/nav-jobs.svg" alt="" />
            <span>Jobs</span>
          </NavItem>
          <User>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt=""></img>
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            <span>
              Me <img src="/images/down-icon.svg" alt="" />
            </span>
            <button onClick={() => props.signOut()}> Sign Out</button>
          </User>
          <Work>
            <img src="/images/nav-work.svg" alt="" />
            <span>Jobs</span>
          </Work>
        </Nav>
        <NavMessageIcon>
          <img src="/images/nav-messaging.svg" alt="" />
        </NavMessageIcon>
        <PostModal showModal={showModal} handleClick={handleClick} />
      </Container>
    </>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 8vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: white;
  z-index: 100;
  & > * {
    margin: auto auto;
  }
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  & > * {
    height: 2rem;
    margin: 0rem 0.5rem;
    cursor: text;
  }
  .user-image {
    display: none;
  }
  @media (max-width: 820px) {
    & > img {
      display: none;
    }
    .user-image {
      display: flex;
    }
    .user-image > img {
      height: 35px;
      border-radius: 55%;
    }
  }
`;
const SearchBar = styled.div`
  height: 2rem;
  width: 15rem;
  display: flex;
  background-color: #eef3f8;
  align-items: center;
  border-radius: 5px;

  & > img {
    height: 50%;
  }
  & > input {
    height: 1.75rem;
    outline: 0px;
    border: 0px;
    background-color: #eef3f8;
  }
  & > * {
    margin-left: 0.5rem;
  }
`;
const Nav = styled.nav`
  height: 100%;
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media (max-width: 820px) {
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: white;
    width: 100%;
    height: 10%;
  }
`;
const NavItem = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:nth-child(4) {
    display: none;
  }
  :nth-child(4) > img {
    height: 25px;
    width: 30px;
  }
  @media (max-width: 820px) {
    :nth-child(3) {
      display: none;
    }
    :nth-child(4) {
      display: flex;
      align-items: center;
    }
  }
  :hover {
    cursor: pointer;
  }
`;

const NavMessageIcon = styled.a`
  display: none;

  @media (max-width: 820px) {
    display: flex;

    & > img {
      height: 30px;
      width: 30px;
    }
  }
`;
const User = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > img {
    height: 25px;
    border-radius: 55%;
  }
  :hover {
    cursor: pointer;
  }
  @media (max-width: 820px) {
    display: none;
  }
  & > button {
    display: none;
  }
  :hover {
    & > button {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      text-align: center;
      margin: auto 0rem;
      width: 80px;
      top: 50px;
      background-color: white;
    }
  }
`;
const Work = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  :hover {
    cursor: pointer;
  }
  @media (max-width: 820px) {
    display: none;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutAPI()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
// export default Header;
