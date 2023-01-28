import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const LeftSide = (props) => {
  return (
    <>
      {" "}
      <Leftside>
        <LeftTop>
          <div className="user-pic">
            <img
              src="https://img.freepik.com/free-photo/gradient-dark-blue-futuristic-digital-grid-background_53876-129728.jpg?auto=format&h=200"
              alt=""
            />
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt=""></img>
            ) : (
              <img src="/images/user.svg" alt="" />
            )}
            <div className="user-info">
              <h5>{props.user ? props.user.displayName : "User"}</h5>
              <p className="user-desc">
                Full Stack Web Developer || Competitive Programmer || Javascript
              </p>
              <hr style={{ border: "solid 0.5px lightgrey" }} />
              <div className="profile-stats">
                <div className="profile-visits-stats">
                  <p>Who viewed your profile</p>
                  <span>500</span>
                </div>
                <div className="post-impression-stats">
                  <p>Who viewed your profile</p>
                  <span>500</span>
                </div>
              </div>
            </div>
            <div className="premium-features">
              <p> See your Premium features</p>
            </div>
            <div className="my-items">
              {" "}
              <p>My items</p>{" "}
            </div>
          </div>
        </LeftTop>

        <LeftBottom></LeftBottom>
      </Leftside>
    </>
  );
};

const Leftside = styled.div`
  margin-left: 5rem;
  height: 80vh;
  width: 20%;
  @media (max-width: 820px) {
    display: none;
  }
`;

const LeftTop = styled.div`
  width: 90%;
  height: 60%;
  background-color: white;
  border-radius: 10px;
  border-top: 5px solid orange;
  .user-pic {
    width: 100%;
    height: 25%;
  }

  color: grey;
  .user-pic :first-child {
    width: 100%;
    height: fit-content;
    object-fit: cover;
    border-radius: inherit;
  }
  .user-pic > :nth-child(2) {
    display: flex;
    align-items: center;
    margin: auto;
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 5rem;
    margin-top: -2rem;
  }
  .user-info {
    margin-top: 2.5rem;

    text-align: center;
  }
  .user-info > h5 {
    color: black;
  }
  .user-info > h5:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .user-desc {
    font-size: small;
    color: grey;
    width: 80%;
    margin: 0.5rem auto;
  }
  .profile-stats {
    margin: 0.5rem 0rem;
    font-size: small;
  }
  .profile-visits-stats {
    /* border: solid 2px black; */
    display: flex;
  }
  .profile-visits-stats:hover {
    /* border: solid 2px black; */
    background-color: lightgrey;

    cursor: pointer;
  }
  .profile-visits-stats > * {
    margin: 0rem 0.5rem;
  }
  .profile-visits-stats > span {
    color: blue;
  }
  .post-impression-stats {
    /* border: solid 2px black; */
    display: flex;
  }
  .post-impression-stats:hover {
    /* border: solid 2px black; */
    background-color: lightgrey;

    cursor: pointer;
  }
  .post-impression-stats > * {
    margin: 0rem 0.5rem;
  }
  .post-impression-stats > span {
    color: blue;
  }
  .premium-features {
    height: 35%;
    border-top: 0.5px solid lightgrey;
    border-bottom: solid 0.5px lightgrey;
    display: flex;
    align-items: center;
  }
  .premium-features > p {
    margin-left: 1.5rem;
    color: black;
    font-size: small;
  }
  .my-items {
    height: 35%;
    border-top: 0.5px solid lightgrey;

    display: flex;
    align-items: center;
  }
  .my-items > p {
    margin-left: 1.5rem;
    color: black;
    font-size: small;
  }
  .premium-features:hover,
  .my-items:hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`;
const LeftBottom = styled.div`
  margin-top: 0.5rem;
  width: 90%;
  height: 50%;
  border-radius: 10px;

  background-color: white;
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

export default connect(mapStateToProps)(LeftSide);
