import React from "react";
import styled from "styled-components";

const RightSide = () => {
  return (
    <>
      {" "}
      <Rightside>Right</Rightside>
    </>
  );
};
const Rightside = styled.div`
  background-color: white;
  height: 90vh;
  width: 25%;
  @media (max-width: 820px) {
    display: none;
  }
`;
export default RightSide;
