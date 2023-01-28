import React from "react";
import styled from "styled-components";
import Feed from "./Feed";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const Home = (props) => {
  return (
    <>
      <Container>
        {!props.user && <Navigate to="/" />}
        <LeftSide />
        <Feed />
        <RightSide />
      </Container>
    </>
  );
};
const Container = styled.div`
  padding-top: 60px;
  width: 100%;
  display: flex;
  gap: 2.5rem;
  overflow-y: scroll;
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};
const mapDispatchToProps = (dispatch) => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Home);
